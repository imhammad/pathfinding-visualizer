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

  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Base Attack Pathfinding
        </h1>
        <p className="text-slate-500">
          A* Algorithm Visualizer
        </p>
      </header>

      <main className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
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
                />
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}