'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import RecentAuditsModal from './modal/recent-audit-modal';
interface RecentAuditsProps {
  onEmployeeData: (data: any) => void;
}
export function RecentAudits({ onEmployeeData }: RecentAuditsProps) {
  const [topEmployees, setTopEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopAudits = async () => {
    setIsLoading(true);
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://chatwithpdf.in/rnb_callbackurl/get-mvr-count',
        headers: {}
      };

      const response = await axios.request(config);
      const data = response.data.summary; // Accessing the summary array
      // Transforming the data to a more usable format
      const formattedData = data.map((employee: any) => {
        const name = Object.keys(employee)[0]; // Get the employee name
        const details = employee[name]; // Get the details for that employee
        return {
          name,
          count: details.count,
          shopNames: details.shopNames
        };
      });
      setTopEmployees(formattedData);
      onEmployeeData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAudits();
  }, []);

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="mt-40 flex h-full items-center justify-center">
          <svg
            className="h-8 w-8 animate-spin text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      ) : (
        topEmployees.map((employee: any) => (
          <div key={employee.name} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex  w-full items-start justify-between">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {employee.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Audits: {employee.count}
                </p>
              </div>
              <RecentAuditsModal employee={employee} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
