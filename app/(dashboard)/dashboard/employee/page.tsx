'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  _id: string;
  emailid: string;
  apmcode: string;
  name: string;
  number: string;
  branchname: string;
  designation: string;
}

export default function VehicleCarBotDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user'); // Ensure the API endpoint is correct
      if (response.data.success && response.data.data) {
        setUsers(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError(
        'Error fetching users: ' +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen flex-col">
      <div className="w-full flex-1 space-y-4 p-4 pt-6 md:p-8">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <Card className="h-full flex-1 flex-col">
          <CardHeader>
            <div className="text-2xl font-bold">Vehicle Car Bot Users</div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {users.length === 0 ? (
              <div>No users found.</div>
            ) : (
              <div className="relative">
                <ScrollArea className="h-[calc(100vh-250px)] overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Email ID</TableHead>
                        <TableHead className="text-center">APM Code</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Number</TableHead>
                        <TableHead className="text-center">
                          Branch Name
                        </TableHead>
                        <TableHead className="text-center">
                          Designation
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell className="text-center">
                            {user.emailid || 'N/A'}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.apmcode || 'N/A'}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.name || 'N/A'}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.number || 'N/A'}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.branchname || 'N/A'}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.designation || 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
