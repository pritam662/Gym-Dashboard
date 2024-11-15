'use client';
import { Checkbox } from '@/components/ui/checkbox';
import IndetailMarksModal from '@/components/modal/indetail-marks';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    id: 'id',
    header: 'SHOP ID',
    cell: ({ row }) => <>{row.index + 101}</>
  },
  {
    accessorKey: 'createdAtChanged',
    header: 'CREATED'
  },
  {
    accessorKey: 'shopName',
    header: 'SHOP NAME'
  },
  {
    accessorKey: 'employeeDetailsChanged',
    header: 'EMPLOYEE'
  },
  {
    accessorKey: 'totalMarks',
    header: 'TOTAL MARKS'
  },
  {
    header: 'VIEW MORE',
    cell: ({ row }) => <IndetailMarksModal data={row.original} />
  },
  {
    id: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
