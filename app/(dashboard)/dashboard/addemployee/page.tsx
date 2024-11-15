'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

// Schema for validation
const FormSchema = z.object({
  emailid: z.string().email('Please enter a valid email'),
  apmcode: z.string().min(2, 'APM Code must be at least 2 characters long'),
  name: z.string().min(2, 'Name should be more than 2 characters'),
  number: z.string().length(10, 'Phone number must be 10 digits'),
  branchname: z.string().min(1, 'Branch name is required'),
  designation: z.string().min(2, 'Designation must be at least 2 characters')
});

export default function AddEmployee() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emailid: '',
      apmcode: '',
      name: '',
      number: '',
      branchname: '',
      designation: ''
    }
  });

  const { toast } = useToast();
  const [branchData, setBranchData] = useState<string[]>([]); // Correct variable name
  const [branchstatus, setBranchstatus] = useState('idle');
  const [addEmployeeLoading, setAddEmployeeLoading] = useState(false);

  // Fetch branch data on component mount
  useEffect(() => {
    const fetchBranch = async () => {
      if (branchstatus === 'idle') {
        try {
          const response = await axios.get('/api/addemployee');
          if (response.data && response.data.branches) {
            setBranchData(response.data.branches); // Ensure it sets the branches correctly
          } else {
            setBranchData([]); // Fallback to an empty array if no branches found
            console.error('No branches found in the response');
          }
          setBranchstatus('success');
        } catch (error) {
          setBranchstatus('error');
          setBranchData([]); // Fallback to empty array on error
          console.error('Error fetching branches:', error);
        }
      }
    };
    fetchBranch();
  }, [branchstatus]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setAddEmployeeLoading(true);

    try {
      const response = await axios.post( 
        '/api/addemp', 
        data, 
        {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast({ title: response.data.message });
      form.reset(); // Reset the form
    } catch (error) {
      const axiosErr = error as AxiosError;
      toast({
        title: 'Error',
        description: axiosErr.message || 'Error in adding Employee',
        variant: 'destructive'
      });
    } finally {
      setAddEmployeeLoading(false);
    }
  }

  return (
    <>
      <main className="flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-3 flex flex-col items-center"
          >
            <h1 className="text-2xl font-semibold">Add Employee</h1>
            <div className="flex w-[350px] flex-col items-center">
              {/* Email ID Field */}
              <FormField
                control={form.control}
                name="emailid"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Email ID:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* APM Code Field */}
              <FormField
                control={form.control}
                name="apmcode"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>APM Code:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter APML Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branchname"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Branch name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Phone Number:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Branch Name Field */}

              {/* Designation Field */}
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem className="m-4">
                    <FormLabel>Designation:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Designation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={addEmployeeLoading}
              >
                {addEmployeeLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </main>
      <Toaster />
    </>
  );
}
