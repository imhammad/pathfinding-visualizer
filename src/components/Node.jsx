export default function Node({ row, col, isStart, isEnd, isWall }) {
  let extraClassName = 'bg-white';
  
  if (isEnd) extraClassName = 'bg-red-500';
  else if (isStart) extraClassName = 'bg-green-500';
  else if (isWall) extraClassName = 'bg-slate-800';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`w-6 h-6 border border-blue-100 ${extraClassName}`}
    ></div>
  );
}