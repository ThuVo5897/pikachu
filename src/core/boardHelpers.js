const EMOJIS = ['🍎','🍊','🍇','🍉','🍌','🍓','🍒','🍑','🍍','🥥','🥝','🥑'];

export const generateBoard = (cols = 12, rows = 8) => {
  const totalTiles = cols * rows;
  const pairsNeeded = totalTiles / 2;
  
  // Create array of pairs
  let tilesQueue = [];
  for (let i = 0; i < pairsNeeded; i++) {
    const emoji = EMOJIS[i % EMOJIS.length];
    tilesQueue.push(emoji, emoji);
  }

  // Shuffle
  tilesQueue.sort(() => Math.random() - 0.5);

  let board = [];
  let index = 0;
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        id: `${x}_${y}`,
        x,
        y,
        emoji: tilesQueue[index],
        isEmpty: false,
      });
      index++;
    }
    board.push(row);
  }

  return board;
};

// Returns a simple 2D array of (emoji|null) for pathfinding logic
export const getLogicBoard = (board, cols, rows) => {
  const logicBoard = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push(board[y][x].isEmpty ? null : board[y][x].emoji);
    }
    logicBoard.push(row);
  }
  return logicBoard;
};

export const shuffleBoard = (board, cols, rows) => {
  const activeTiles = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!board[y][x].isEmpty) {
        activeTiles.push(board[y][x].emoji);
      }
    }
  }

  activeTiles.sort(() => Math.random() - 0.5);

  let index = 0;
  const newBoard = board.map((row) =>
    row.map((tile) => {
      if (!tile.isEmpty) {
        const newTile = { ...tile, emoji: activeTiles[index] };
        index++;
        return newTile;
      }
      return tile;
    })
  );

  return newBoard;
};
