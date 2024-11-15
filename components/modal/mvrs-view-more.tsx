/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MWJxxKsryNr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog';
import { memo } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

function MVRSViewMoreModal({ isOpen, onClose, data }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button className="h-7 px-2 py-1">Show Marks</Button>
      </DialogTrigger> */}
      <DialogContent className="h-3/4 overflow-y-scroll sm:max-w-[800px]">
        <div className="flex w-full items-center justify-between border-b pb-4">
          <DialogTitle>{data.shopName}</DialogTitle>
          <p className="mr-4">👤 {data.employeeDetailsChanged}</p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1.5">
            <Label htmlFor="strength">Strength 💪</Label>
            <Textarea
              id="strength"
              readOnly
              className="min-h-[100px] italic"
              defaultValue={data.strength || 'N/A'}
            ></Textarea>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="opportunities">Opportunities 🎯</Label>
            <Textarea
              id="opportunities"
              readOnly
              className="min-h-[100px] italic"
              defaultValue={data.opportunities || 'N/A'}
            ></Textarea>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="actionable">Actionable 💥</Label>
            <Textarea
              id="actionable"
              readOnly
              className="min-h-[100px] italic"
              defaultValue={data.actionable || 'N/A'}
            ></Textarea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(MVRSViewMoreModal);
