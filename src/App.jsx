import { useState, useEffect } from 'react';
import Node from './components/Node';
import { aStar, getNodesInShortestPathOrder } from './algorithms/aStar';

const ROWS = 20;
const COLS = 40;

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 34;

export default function App() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);

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

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd) return grid;
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    if (isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'w-6 h-6 border border-blue-50 node-shortest-path';
        }
      }, 50 * i);
    }
    setTimeout(() => setIsVisualizing(false), 50 * nodesInShortestPathOrder.length);
  };

  const animateAStar = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isEnd && !node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'w-6 h-6 border border-blue-50 node-visited';
        }
      }, 10 * i);
    }
  };

  const visualizeAStar = () => {
    if (isVisualizing) return;
    setIsVisualizing(true);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    
    const visitedNodesInOrder = aStar(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    
    animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const clearPath = () => {
    if (isVisualizing) return;
    const newGrid = createInitialGrid();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        newGrid[row][col].isWall = grid[row][col].isWall;
        const node = newGrid[row][col];
        let extraClassName = 'bg-white';
        if (node.isStart) extraClassName = 'bg-green-500 shadow-sm z-10 relative';
        else if (node.isEnd) extraClassName = 'bg-red-500 shadow-sm z-10 relative';
        else if (node.isWall) extraClassName = 'bg-slate-800 border-slate-700';
        document.getElementById(`node-${row}-${col}`).className =
          `w-6 h-6 border border-blue-50 ${extraClassName}`;
      }
    }
    setGrid(newGrid);
  };

  const clearBoard = () => {
    if (isVisualizing) return;
    const newGrid = createInitialGrid();
    setGrid(newGrid);
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const node = newGrid[row][col];
        let extraClassName = 'bg-white';
        if (node.isStart) extraClassName = 'bg-green-500 shadow-sm z-10 relative';
        else if (node.isEnd) extraClassName = 'bg-red-500 shadow-sm z-10 relative';
        document.getElementById(`node-${row}-${col}`).className =
          `w-6 h-6 border border-blue-50 ${extraClassName}`;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Base Attack Pathfinding
        </h1>
        <p className="text-slate-500 mb-6">
          A* Algorithm Visualizer
        </p>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => visualizeAStar()}
            disabled={isVisualizing}
            className={`px-6 py-3 font-bold rounded-full transition-all shadow-md text-white
              ${isVisualizing 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'}`}
          >
            {isVisualizing ? 'Attack in Progress...' : 'Start Attack'}
          </button>
          
          <button 
            onClick={() => clearPath()}
            disabled={isVisualizing}
            className="px-6 py-3 font-bold rounded-full transition-all shadow-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Path
          </button>

          <button 
            onClick={() => clearBoard()}
            disabled={isVisualizing}
            className="px-6 py-3 font-bold rounded-full transition-all shadow-md bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Board
          </button>
        </div>
      </header>

      <main 
        className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 select-none"
        onMouseLeave={() => setMouseIsPressed(false)}
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