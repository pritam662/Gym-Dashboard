import { TrendingUp, TrendingDown, MoveRight } from 'lucide-react';

export const LastAuditMarksImprovement = ({
  marks
}: {
  marks: Array<number>;
}) => {
  const reversedMarks = [...marks].reverse();

  if (reversedMarks.length < 2) {
    return <MoveRight className="text-gray-500" />; // Not enough data to determine trend
  }

  const lastElement = reversedMarks[reversedMarks.length - 1];
  const secondLastElement = reversedMarks[reversedMarks.length - 2];

  if (lastElement > secondLastElement) {
    return <TrendingUp className="text-green-500" />;
  } else if (lastElement < secondLastElement) {
    return <TrendingDown className="text-red-500" />;
  } else {
    return <MoveRight className="text-yellow-500" />;
  }
};
