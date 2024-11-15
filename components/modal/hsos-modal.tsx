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

const HsosModal = ({ data }: any) => {
  const fieldArray = [
    { accessorKey: 'todo', header: 'To Do defined and understood' },
    { accessorKey: 'planforday', header: 'Plan for the day is ready' },
    { accessorKey: 'cleanhands', header: 'Clean Hands' },
    { accessorKey: 'chemicals', header: 'Right use and storage of cleaning chemicals' },
    { accessorKey: 'liftingboxes', header: 'Correct use of lifting and carrying boxes' },
    { accessorKey: 'wetsign', header: 'Use of caution wet floor signs' },
    { accessorKey: 'mopprocess', header: 'Mop the floor using right procedures' },
    { accessorKey: 'qa1', header: 'Freedom from accidents is important' },
    { accessorKey: 'qa2', header: 'The safety of life and the body of people is the most important' },
    { accessorKey: 'qa3', header: 'Customer Trust-Enhancing trust in the quality' },
    { accessorKey: 'qa4', header: 'Most common source/ cause of fire are cigarette butts' },
    { accessorKey: 'qa5', header: 'Never keep or store anything near electrical panels' },
    { accessorKey: 'qa6', header: 'What are the three elements upon which fire depends' },
    { accessorKey: 'qa7', header: 'How to use a Fire Extinguisher' },
    { accessorKey: 'qa8', header: 'Who leaves the branch, First, in event of fire' },
    { accessorKey: 'qa9', header: 'What are the precautions you need to take while handling cleaning chemicals' },
    { accessorKey: 'qa10', header: 'What steps do you need to take to prevent falls in the branch' },
    { accessorKey: 'qa11', header: 'Who takes care of the equipments repairs in the branch' },
    { accessorKey: 'qa12', header: 'Give 4 Rules of safe use of Step ladder' },
    { accessorKey: 'qa13', header: 'How can you keep lifting heavy boxes easy and risk free' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View More Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='capitalize'>{data.traineeName}</DialogTitle>
        </DialogHeader>
        <div className='h-[400px] overflow-auto'>
        <Table className="relative">
          <TableBody>
            {fieldArray.map((field) => (
              <TableRow key={field.accessorKey}>
                <TableCell>{field.header}</TableCell>
                <TableCell>
                  {data[field.accessorKey] === 'Yes' ? '🟢' : '🔴'}
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
