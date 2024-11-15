import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Meeting {
  _id: string;
  meeting_title: string;
  date: string;
  time: string;
  attendees: string;
  agenda_items: string;
  discussion_notes: string;
  action_items: string;
}

function ViewMeetingData({ meeting }: { meeting: Meeting }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {meeting ? (
          <>
            <DialogHeader>
              <DialogTitle>{meeting.meeting_title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  value={formatDate(meeting.date)}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  value={meeting.time}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attendees" className="text-right">
                  Attendees
                </Label>
                <Input
                  id="attendees"
                  value={meeting.attendees}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="agenda" className="text-right">
                  Agenda
                </Label>
                <textarea
                  id="agenda"
                  value={meeting.agenda_items}
                  className="col-span-3"
                  readOnly
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <textarea
                  id="notes"
                  value={meeting.discussion_notes}
                  className="col-span-3"
                  readOnly
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="actions" className="text-right">
                  Actions
                </Label>
                <textarea
                  id="actions"
                  value={meeting.action_items}
                  className="col-span-3"
                  readOnly
                  rows={3}
                />
              </div>
            </div>
          </>
        ) : (
          <div>Loading meeting data...</div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewMeetingData;
