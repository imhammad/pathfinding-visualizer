# Base Attack Pathfinding Visualizer

An interactive web application engineered to visualize the A* (A-Star) Pathfinding Algorithm. 

This project contextualizes standard graph theory through the lens of a strategy game base attack. Users can construct impenetrable walls and defensive layouts, then initiate the algorithm to watch the mathematical logic route the optimal path to the target in real-time. 

<div align="center">
  <img src="public/demo.gif" alt="Pathfinding Animation" width="800" />
</div>

### Live Demo
[**Click here to view the live visualization**](https://imhammad.github.io/pathfinding-visualizer/)

![Pathfinding Animation](placeholder-for-gif.gif)

### The Motivation
Studying algorithms strictly through textbooks and pseudocode often leaves a gap in practical intuition. I built this visualizer to bridge the divide between theoretical computer science and interactive engineering. By building the search parameters from the ground up and overriding React's standard rendering cycle for direct DOM manipulation, I wanted to physically see how heuristic calculations behave when trapped in complex dead-ends and mazes.

### Why A* is Important and Where it is Used
The A* algorithm is one of the most successful and widely used pathfinding algorithms in computer science due to its completeness and optimal efficiency. It is heavily utilized across several industries:
* **Video Game AI:** Powering the navigation meshes that allow NPCs and strategy game units to traverse complex, dynamic terrain.
* **Robotics and Autonomous Vehicles:** Allowing drones and rovers to calculate safe trajectories around physical obstacles in real-time.
* **Geospatial Routing:** Serving as the foundational logic behind early GPS navigation systems and modern traffic routing applications.
* **Network Routing:** Optimizing the flow of data packets across complex telecommunications networks.

### The Algorithm Mechanics
A* guarantees the shortest path by evaluating nodes based on the following equation: 
$f(n) = g(n) + h(n)$

* $g(n)$: The exact cost (distance) from the starting node to the current node.
* $h(n)$: The heuristic, which is an estimated distance from the current node directly to the end node. This project utilizes the Manhattan distance calculation.
* $f(n)$: The total cost. The algorithm strictly explores the unvisited node with the lowest $f(n)$ value first, ensuring efficiency.

### Technical Stack
* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion (for physics-based interaction) & Direct DOM Manipulation (for 60fps algorithm rendering)
* **Deployment:** GitHub Pages

### Features
* **Interactive Grid:** Click and drag to draw custom wall layouts seamlessly.
* **Performance Optimization:** Bypasses React state batching during the search phase to achieve highly performant, lag-free visual rendering.
* **Control Panel:** Selectively clear the generated path while preserving your custom maze, or wipe the entire board clean.

### Local Installation
To run this project locally:

```bash
git clone [https://github.com/imhammad/pathfinding-visualizer.git](https://github.com/imhammad/pathfinding-visualizer.git)
cd pathfinding-visualizer
npm install
npm run dev
