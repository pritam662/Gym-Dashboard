import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';

const HocsModal = ({ data }: any) => {
  const fieldArray = [
    { accessorKey: 'grooming', header: 'Uniform neat and clean' },
    { accessorKey: 'planForTheDay', header: 'Plan for the day is ready' },
    { accessorKey: 'handsClean', header: 'Clean Hands 2-hour Hand wash' },
    {
      accessorKey: 'towel',
      header: 'Changes towels / dusters after every hour'
    },
    {
      accessorKey: 'cleanSurface',
      header: 'Adherence to product holding time and arrangement'
    },
    { accessorKey: 'mopping', header: 'Right Method for mopping the floors' },
    {
      accessorKey: 'defineCleanAndSanitize',
      header: 'Define clean and sanitize'
    },
    {
      accessorKey: 'dosAndDontsHandlingTrash',
      header: 'What are the do’s and don’ts while handling trash?'
    },
    {
      accessorKey: 'whatToDoWhenProductExpired',
      header: 'What must you do if a product has passed its shelf life?'
    },
    {
      accessorKey: 'appearanceOnWork',
      header: 'How must your appearance be when you come to work?'
    },
    {
      accessorKey: 'generalSignsOfDamagedProduct',
      header: 'What are the general signs of damaged/ expired products?'
    },
    {
      accessorKey: 'whyUseHotWaterToMopFloor',
      header: 'Why do we use hot water to mop the Floor?'
    },
    {
      accessorKey: 'sequenceOfMoppingFloor',
      header: 'What is the right sequence of moping the floor?'
    }
  ];
  const filterArrayData = [
    { accessorKey: 'strength', header: 'Strength' },
    { accessorKey: 'opportunities', header: 'Opportunities' },
    { accessorKey: 'weakness', header: 'Weakness' },
    { accessorKey: 'actionable', header: 'Actionable' }
  ];
  const [openCollapsible, setOpenCollapsible] = useState<string | null>('qp');

  const handleCollapsibleOpen = (collapsibleName: string | null) => {
    setOpenCollapsible(collapsibleName);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[400px] w-full overflow-auto flex flex-col">
        <DialogHeader>
        </DialogHeader>
        <div className=" flex gap-4 flex-col ">
          <Collapsible
            open={openCollapsible === 'qp'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('qp')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3 font-semibold">
              Extras  <div className='text-sm '>
              {fieldArray.length}
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table className="relative">
                <TableBody>
                  {fieldArray.map((field) => (
                    <TableRow key={field.accessorKey}>
                      <TableCell>{field.header}</TableCell>
                      <TableCell>
                        {data[field.accessorKey] === 'Yes'
                          ? '🟢'
                          : data[field.accessorKey] === 'No'
                          ? '🔴'
                          : data[field.accessorKey]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={openCollapsible === 'sttc'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('sttc')
                : handleCollapsibleOpen(null);
            }}
          >
            {' '}
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3 font-semibold">
              Remarks <div className='text-sm '>
              {filterArrayData.length}
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table className="relative">
                <TableBody>
                  {filterArrayData.map((field) => (
                    <TableRow key={field.accessorKey}>
                      <TableCell className='font-medium'>{field.header}</TableCell>
                      <TableCell>
                      <Textarea placeholder="Your Remarks" rows={3} className="w-full"  value={data[field.accessorKey]} />
                        
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HocsModal;
