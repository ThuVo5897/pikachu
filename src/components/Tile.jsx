import React from 'react';

const Tile = ({ tile, isSelected, onClick }) => {
  if (tile.isEmpty) {
    return <div className="tile empty"></div>;
  }

  return (
    <div 
      className={`tile ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      {tile.emoji}
    </div>
  );
};

export default Tile;
