import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export const LastAuditMarksChart = ({ marks }: { marks: Array<number> }) => {
  const reversedMarks = [...marks].reverse();

  return (
    <div className="flex cursor-pointer items-center justify-start gap-1">
      {reversedMarks.map((mark, i) => {
        let bgColor = '';
        if (i === 0) {
          bgColor = 'bg-green-500';
        } else if (mark === reversedMarks[i - 1]) {
          bgColor = 'bg-yellow-500';
        } else {
          bgColor = mark > reversedMarks[i - 1] ? 'bg-green-500' : 'bg-red-500';
        }

        return (
          <TooltipProvider key={i} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`${bgColor} h-[6px] w-[11px]`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{mark}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};
