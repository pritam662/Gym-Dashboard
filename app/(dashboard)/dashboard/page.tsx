'use client';

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Meeting {
  _id: string;
  clientName: string;
  clientNumber: string;
  date: string;
  time: string;
  status: string;
  markDate: string;
  statusTime: string;
  TotalTime: string;
}

const GymDashboard = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('/api/Gym_Management');
        const data = await response.json();
        if (data.success && data.data) {
          setMeetings(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const timeToDate = (time: string) => {
    const today = new Date();
    const [hours, minutesWithPeriod] = time.split(':');
    const [minutes, period] = minutesWithPeriod.split(' ');
    let hour = parseInt(hours, 10);
    if (period === 'pm' && hour < 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;
    const formattedTime = `${today.toLocaleDateString()} ${hour}:${minutes}:00`;
    const formattedDate = new Date(formattedTime);
    return isNaN(formattedDate.getTime()) ? new Date() : formattedDate;
  };

  const calculateTotalTime = (meeting: Meeting) => {
    if (!meeting.time || !meeting.statusTime) return 'N/A';
    try {
      const startTime = timeToDate(meeting.time);
      const endTime = timeToDate(meeting.statusTime);
      const diffMs = endTime.getTime() - startTime.getTime();
      if (diffMs < 0) return 'N/A';
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
    } catch {
      return 'N/A';
    }
  };

  const normalizeNumber = (num: any) => String(num || '').replace(/\D/g, '');

  const searchData = (data: Meeting[], term: string) => {
    const searchValue = term.toLowerCase().trim();
    if (!searchValue) return data;

    return data.filter((meeting) => {
      const clientName = (meeting.clientName || '').toLowerCase().trim();
      const clientNumber = normalizeNumber(meeting.clientNumber || '')
        .toLowerCase()
        .trim();

      return (
        clientName.includes(searchValue) || clientNumber.includes(searchValue)
      );
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const calculateTimeDifference = (meetingTime: string) => {
    const meetingDate = timeToDate(meetingTime); // Convert the given meeting time to a Date object
    const currentDate = new Date(); // Get the current time

    const diffMs = currentDate.getTime() - meetingDate.getTime(); // Calculate the time difference in milliseconds
    const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours

    return diffHours;
  };

  const filteredMeetings = searchData(meetings, searchTerm);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-800 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-white p-4 dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          GYM Attendance Report Data
        </h1>
      </div>

      <div className="mb-4 flex items-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search by client name or number..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>

      {filteredMeetings.length === 0 && (
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
          No matching records found
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-200px)] overflow-x-auto rounded-lg">
        <div className="w-full">
          <table className="w-full table-auto border-collapse bg-white text-sm dark:bg-gray-800">
            <thead>
              <tr>
                {[
                  'Client Name',
                  'Client Number',
                  'Date',
                  'Time',
                  'Status',
                  'Mark Date',
                  'Status Time',
                  'Total Time'
                ].map((header) => (
                  <th
                    key={header}
                    className="sticky top-0 bg-gray-100 px-4 py-3 text-center font-semibold text-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMeetings.map((meeting) => {
                const timeDiff = calculateTimeDifference(meeting.time); // Get the time difference

                let statusClass = ''; // Initialize the status class
                if (meeting.status === 'yes') {
                  // If the status is "Yes", check the time difference
                  if (timeDiff <= 12) {
                    statusClass =
                      'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100'; // Green color for within 12 hours
                  } else {
                    statusClass =
                      'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'; // Red color for after 12 hours
                  }
                } else {
                  // Other statuses (no change)
                  statusClass =
                    meeting.status === 'no'
                      ? 'bg-red-100 text-white-800 dark:bg-green-600 dark:text-white-100'
                      : meeting.status === 'Pending'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
                }

                return (
                  <tr
                    key={meeting._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 text-center text-gray-800 dark:text-white">
                      {meeting.clientName || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center text-gray-800 dark:text-white">
                      {meeting.clientNumber || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-800 dark:text-white">
                      {meeting.date ? formatDate(meeting.date) : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-800 dark:text-white">
                      {meeting.time || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                      >
                        {meeting.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-800 dark:text-white">
                      {meeting.markDate
                        ? new Date(meeting.markDate).toLocaleString('en-GB')
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-800 dark:text-white">
                      {meeting.statusTime || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-800 dark:text-white">
                      {calculateTotalTime(meeting)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GymDashboard;
