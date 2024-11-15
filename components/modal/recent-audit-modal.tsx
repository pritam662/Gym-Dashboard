import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface Employee {
  name: string;
  count: number;
  shopNames: { [key: string]: number };
}

interface RecentAuditsModalProps {
  employee: Employee;
}

const RecentAuditsModal = ({ employee }: RecentAuditsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View More Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">{employee.name}</DialogTitle>
        </DialogHeader>
        <div>
          {Object.entries(employee.shopNames).map(([shopName, count]) => (
            <div
              key={shopName}
              className="flex items-center justify-between pb-2 text-xs text-muted-foreground"
            >
              {shopName}: <p className="font-bold">{count}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecentAuditsModal;
