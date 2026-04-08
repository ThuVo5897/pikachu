import React from 'react';

const Tile = ({ tile, isSelected, isHinted, onClick }) => {
  if (tile.isEmpty) {
    return <div className="tile empty"></div>;
  }

  const classes = ['tile'];
  if (isSelected) classes.push('selected');
  if (isHinted) classes.push('hinted');

  return (
    <div 
      className={classes.join(' ')} 
      onClick={onClick}
    >
      {tile.emoji}
    </div>
  );
};

export default Tile;
