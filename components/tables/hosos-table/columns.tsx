import { Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import HsosModal from '@/components/modal/hsos-modal';
interface RowData {
  id: number;
  createdAt: string;
  traineeName: string;
  stocked: string;
  cleanhands: string;
  equipments: string;
  grooming: string;
  liftingboxes: string;
  appearanceOnWork: string;
  // Add other fields as necessary
}

const fields = [
  { accessorKey: 'createdAt', header: 'Created At', isDate: true },
  { accessorKey: 'traineeName', header: 'Trainee Name',isData: true },
 
  { accessorKey: 'grooming', header: 'Grooming' },
  { accessorKey: 'stocked', header: 'Products are stocked' },
  { accessorKey: 'equipments', header: 'Equipments are all working' },
 
];

const Tablecolumns: ColumnDef<RowData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  ...fields.map(field => ({
    accessorKey: field.accessorKey as keyof RowData,
    header: field.header,
    cell: field.isDate
      ? ({ row }: { row: Row<any> }) => <div>{new Date(row.original[field.accessorKey]).toLocaleDateString()}</div>
      : field.isData
        ? ({ row }: { row: Row<any> }) => <div>{row.original[field.accessorKey]}</div>
        : ({ row }: { row: Row<any> }) => (
            <div>
              {row.original[field.accessorKey] === 'Yes' ? '🟢' : '🔴'}
            </div>
          )
  })),{
      accessorKey: 'marks', 
      header: `Marks Obtained `, 
    cell: ({ row }: { row: Row<any> }) => <div>{row.original.marks} | {row.original.percent}%</div>
  }
  ,{
    id: 'view-more',
    header: 'View More',
    cell: ({ row }) => (
      <HsosModal data={row.original} />
    ),
    enableSorting: false,
    enableHiding: false
  }
];

export default Tablecolumns;
