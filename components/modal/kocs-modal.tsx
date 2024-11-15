import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

const HsosModal = ({ data }:any) => {
  const fieldArray = [
    { accessorKey: 'impactOfBoeAndLsm', header: 'Impact of BOE and LSM' },
    { accessorKey: 'accountableOfBoeAndLsm', header: 'Accountable for BOE and LSM Activities' },
    { accessorKey: 'idealPercentageOfBoeInSales', header: 'Ideal Percentage of BOE towards Store Sales' },
    { accessorKey: 'purposeOfDoingBoe', header: 'Purpose of Doing BOE' },
    { accessorKey: 'requirementsOfEventExecution', header: 'Requirements of Event Execution' },
    { accessorKey: 'sevenLevelsOfLsm', header: 'Seven Levels of LSM' },
    { accessorKey: 'commandmentsOfCustomerService', header: 'Commandments of Customer Service' },
    { accessorKey: 'scriptForCommunityApproach', header: 'Script for Community Approach' },
    { accessorKey: 'grooming', header: 'Grooming' },
    { accessorKey: 'lsmCalender', header: 'LSM Calendar' },
    { accessorKey: 'fliers', header: 'Fliers' },
    { accessorKey: 'corporateBrochure', header: 'Corporate Brochure' },
    { accessorKey: 'corporateDatabase', header: 'Corporate Database' },
    { accessorKey: 'contactPerson', header: 'Contact Persons of Schools, Colleges, NGOs & event' },
    { accessorKey: 'activityExecution', header: 'Checklists for Activity Execution' },
    { accessorKey: 'storeKundli', header: 'Store Kundli' },
    { accessorKey: 'feedback', header: 'Feedback' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View More Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='capitalize'>{data.branchName }</DialogTitle>
        </DialogHeader>
        <div className='h-[400px] overflow-auto'>
          <Table className="relative">
            <TableBody>
              {fieldArray.map((field) => (
                <TableRow key={field.accessorKey}>
                  <TableCell>{field.header}</TableCell>
                  <TableCell>
                    {data?.[field.accessorKey] === 'Yes' ? '🟢' : '🔴' || 'No Data Found'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HsosModal;
