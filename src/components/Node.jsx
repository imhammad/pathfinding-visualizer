import { motion } from 'framer-motion';

export default function Node({ 
  row, 
  col, 
  isStart, 
  isEnd, 
  isWall, 
  onMouseDown, 
  onMouseEnter, 
  onMouseUp 
}) {
  let extraClassName = 'bg-white';
  
  // Added slight shadows to the start and end nodes so they stand out
  if (isEnd) extraClassName = 'bg-red-500 shadow-sm z-10 relative';
  else if (isStart) extraClassName = 'bg-green-500 shadow-sm z-10 relative';
  else if (isWall) extraClassName = 'bg-slate-800 border-slate-700';

  return (
    <motion.div
      id={`node-${row}-${col}`}
      className={`w-6 h-6 border border-blue-50 cursor-pointer ${extraClassName}`}
      
      // Mouse Event Listeners
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
      
      // Framer Motion Animation Magic
      // When it becomes a wall, it shrinks slightly, pops up to 115% size, then settles back to normal
      animate={
        isWall 
          ? { scale: [0.8, 1.15, 1], borderRadius: ["50%", "10%", "0%"] } 
          : { scale: 1, borderRadius: "0%" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    />
  );
}