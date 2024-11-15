export const LastAuditMarksInline = ({ marks }: { marks: Array<number> }) => {
  const reversedMarks = [...marks].reverse();

  return (
    <p>
      {reversedMarks.map((mark, i) => {
        let className = '';
        if (i === 0) {
          className = 'text-green-500';
        } else if (mark === reversedMarks[i - 1]) {
          className = 'text-yellow-500';
        } else {
          className =
            mark > reversedMarks[i - 1] ? 'text-green-500' : 'text-red-500';
        }

        const separator = i < reversedMarks.length - 1 ? ' -> ' : '';

        return (
          <span key={i} className={className}>
            {mark}
            <span className="text-primary">{separator}</span>
          </span>
        );
      })}
    </p>
  );
};
