import { LastAuditMarksInline } from './components/last-audit-marks-inline';
import { ColumnDef } from '@tanstack/react-table';
import { LastAuditMarksChart } from './components/last-audit-marks-chart';
import { LastAuditMarksImprovement } from './components/last-audit-marks-improvement';

const columns: ColumnDef<any>[] = [
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
    accessorKey: 'shopName',
    header: 'SHOP NAME'
  },
  {
    header: 'IMPROVEMENT',
    cell: ({ row }: any) => (
      <LastAuditMarksImprovement
        marks={row.original.allAuditMarks.slice(0, 5)}
      />
    )
  },
  {
    header: 'LAST AUDIT MARKS',
    cell: ({ row }: any) => (
      <LastAuditMarksInline marks={row.original.allAuditMarks.slice(0, 5)} />
    )
  },
  {
    header: 'CHART',
    cell: ({ row }: any) => (
      <LastAuditMarksChart marks={row.original.allAuditMarks.slice(0, 5)} />
    )
  },
  {
    header: 'NO. OF AUDITS',
    cell: ({ row }: any) => <>{row.original.allAuditMarks.length}</>
  },
  {
    header: 'LAST AUDIT DAYS'
  }
];

export default columns;
