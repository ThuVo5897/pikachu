import React from 'react';
import Tile from './Tile';
import ConnectionLine from './ConnectionLine';

const Board = ({ board, cols, rows, selected, onTileClick, lines, isGameOver, isPlaying }) => {
  const tileSize = 50;
  const gap = 4;

  return (
    <div className="board-container">
      <div 
        className="board-grid" 
        style={{
          gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${tileSize}px)`
        }}
      >
        {board.map((row, y) => 
          row.map((tile, x) => (
            <Tile 
              key={tile.id} 
              tile={tile} 
              isSelected={selected?.x === x && selected?.y === y}
              onClick={() => onTileClick(x, y)}
            />
          ))
        )}
      </div>
      
      {lines && lines.length > 0 && (
        <ConnectionLine lines={lines} tileSize={tileSize} gap={gap} />
      )}

      {isGameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
        </div>
      )}
    </div>
  );
};

export default Board;
