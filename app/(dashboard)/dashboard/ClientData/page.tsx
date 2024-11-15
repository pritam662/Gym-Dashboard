'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface User {
  _id: string;
  clientName: string;
  clientNumber: number;
  role: string;
}

export default function VehicleCarBotDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/clientdata');
      const data = await response.json();
      if (data.success && data.data) {
        setUsers(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch users');
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

  const handleAddClientClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { clientName, clientNumber, role };

    try {
      const response = await fetch('/api/addclient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Client added successfully!');
        setClientName('');
        setClientNumber('');
        setRole('user');
        setShowForm(false);
        fetchUsers();
      } else {
        setMessage(`Failed to add client: ${data.message}`);
      }
    } catch (error) {
      setMessage('An error occurred while adding the client');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'clientName') setClientName(value);
    if (name === 'clientNumber') setClientNumber(value);
    if (name === 'role') setRole(value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-4 md:p-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}
        <Card>
          <CardHeader className="px-6 py-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Client Data
            </h2>
            <div className="flex justify-end">
              <button
                onClick={handleAddClientClick}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Add Client
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0" >
            <div className="relative">
              <div className="max-h-[calc(100vh-12rem)] overflow-auto">
                <div className="min-w-full">
                  <div className="sticky top-0 bg-gray-100 shadow-sm hover: dark:bg-gray-900 ">
                    <div className="grid grid-cols-3 gap-4 text-gray-700 dark:text-white ">
                      <div className="p-4 text-center font-semibold">
                        Client Name
                      </div>
                      <div className="p-4 text-center font-semibold">
                        Client Number
                      </div>
                      <div className="p-4 text-center font-semibold">Role</div>
                    </div>
                  </div>
                  <div>
                    {users.length === 0 ? (
                      <div className="flex h-32 items-center justify-center text-gray-500">
                        No users found
                      </div>
                    ) : (
                      users.map((user) => (
                        <div
                          key={user._id }
                          className="grid grid-cols-3 gap-4 border-b border-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 light "
                        >
                          <div className="p-4 text-center text-gray-800 dark:text-white">
                            {user.clientName || 'N/A'}
                          </div>
                          <div className="p-4 text-center text-gray-800 dark:text-white">
                            {user.clientNumber || 'N/A'}
                          </div>
                          <div className="p-4 text-center text-gray-800 dark:text-white">
                            {user.role || 'N/A'}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showForm && (
          <div className="bg-grey fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Add New Client
              </h3>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="clientName"
                  placeholder="Client Name"
                  value={clientName}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded border px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="clientNumber"
                  placeholder="Client Number"
                  value={clientNumber}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded border px-3 py-2"
                  required
                />
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mb-4 w-full rounded border px-3 py-2"
                >
                  <option value="Role" disabled>
                    Role
                  </option>
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
                  <option value="trainer">Trainer</option>
                </select>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
                {message && <p className="mt-4 text-center">{message}</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
