import { useState, useEffect } from 'react';
import Node from './components/Node';

const ROWS = 20;
const COLS = 40;

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 34;

export default function App() {
  const [grid, setGrid] = useState([]);
  
  // NEW: State to track if the mouse button is currently pressed
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
  }, []);

  const createInitialGrid = () => {
    const newGrid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(createNode(col, row));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  // NEW: Helper function to safely update the grid without mutating the original array
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    // Safety check: Prevent users from drawing walls over the Start or End points
    if (node.isStart || node.isEnd) return grid;

    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // NEW: Mouse Interaction Handlers
  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    // Only draw a wall if the mouse is actively being held down
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Base Attack Pathfinding
        </h1>
        <p className="text-slate-500 mb-4">
          A* Algorithm Visualizer
        </p>
        <button 
          onClick={() => console.log("A* will run here!")}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Start Attack
        </button>
      </header>

      {/* Added select-none to prevent the browser from highlighting elements while dragging */}
      <main 
        className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 select-none"
        onMouseLeave={() => setMouseIsPressed(false)} // Failsafe: Stops drawing if you drag outside the grid
      >
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}