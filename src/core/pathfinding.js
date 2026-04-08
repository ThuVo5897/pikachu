export const checkPath = (board, cols, rows, start, end) => {
  if (start.x === end.x && start.y === end.y) return null;

  // Directions: Right, Down, Left, Up
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  // We add +2 to cols and rows to allow paths on the outside rim of the board
  const extendedBoardHeight = rows + 2;
  const extendedBoardWidth = cols + 2;

  // Function to check if a position is valid and empty
  const isValid = (x, y) => {
    // Outside the extended board
    if (x < -1 || x > cols || y < -1 || y > rows) return false;
    
    // Target position is always "valid" (temporarily treated as empty)
    if (x === end.x && y === end.y) return true;

    // Inside the actual board boundaries, must be empty (null)
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      if (board[y][x] !== null) return false;
    }
    return true;
  };

  // Queue stores objects: {x, y, dir, turns, path}
  const queue = [];
  const visited = new Map(); // key: x_y_dir_turns, value: true
  
  // Initialize queue from start position
  for (let i = 0; i < 4; i++) {
    queue.push({ 
      x: start.x, 
      y: start.y, 
      dir: i, 
      turns: 0, 
      path: [{x: start.x, y: start.y}] 
    });
  }

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.x === end.x && current.y === end.y) {
      return current.path;
    }

    for (let newDir = 0; newDir < 4; newDir++) {
      const nx = current.x + dx[newDir];
      const ny = current.y + dy[newDir];

      const newTurns = (newDir === current.dir) ? current.turns : current.turns + 1;

      // Rule: max 2 turns
      if (newTurns > 2) continue;

      // Allow 180 degree backward is physically impossible naturally if we just expand, 
      // but to optimize we can just skip backward direction
      if (Math.abs(newDir - current.dir) === 2) continue;

      if (isValid(nx, ny)) {
        const key = `${nx}_${ny}_${newDir}_${newTurns}`;
        if (!visited.has(key)) {
          visited.set(key, true);
          // Only add to path if it's a corner or end point to keep path simple, 
          // but for tracing, full path or corner path are both fine. 
          // Let's store corners for drawing lines:
          let newPath = [...current.path];
          if (newDir !== current.dir) {
             // Add corner, but wait, the corner is the current node!
             newPath.push({x: current.x, y: current.y});
          }
          if (nx === end.x && ny === end.y) {
             newPath.push({x: nx, y: ny});
          }
          queue.push({
            x: nx,
            y: ny,
            dir: newDir,
            turns: newTurns,
            path: newPath
          });
        }
      }
    }
  }

  return null;
};
