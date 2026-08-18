// Performs A* algorithm; returns *all* visited nodes in the order 
// they were visited for animation purposes.
export function aStar(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0; 
  
  // FIX: Properly calculate initial fScore instead of setting to 0
  startNode.fScore = manhattanDistance(startNode, endNode);
  
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    // FIX: Safely check for undefined without treating 0 as a falsy value
    unvisitedNodes.sort((a, b) => {
      const fA = a.fScore !== undefined ? a.fScore : Infinity;
      const fB = b.fScore !== undefined ? b.fScore : Infinity;
      return fA - fB;
    });
    
    const closestNode = unvisitedNodes.shift();

    // If we are trapped by walls and the closest node is at Infinity, stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    // Skip walls
    if (closestNode.isWall) continue;

    // Mark as visited and push to our animation array
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // If we hit the target, stop calculating!
    if (closestNode === endNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid, endNode);
  }
  
  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node, grid, endNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // Calculate the distance from start to this neighbor
    const tentativeDistance = node.distance + 1;
    
    if (tentativeDistance < neighbor.distance) {
      // Store where we came from so we can draw the final path backwards later
      neighbor.previousNode = node;
      neighbor.distance = tentativeDistance;
      // f = g + h (Distance from start + Manhattan distance to end)
      neighbor.fScore = tentativeDistance + manhattanDistance(neighbor, endNode);
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  // Check Up, Down, Left, Right
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Heuristic function: calculates absolute grid distance ignoring walls
function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

// Helper to flatten our 2D array into a 1D array for easier sorting
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Helper function to backtrack from the Town Hall to the Start troop
// to give us the final golden path.
export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}