import React from 'react';

const ConnectionLine = ({ lines, tileSize, gap }) => {
  if (!lines || lines.length < 2) return null;

  // Calculate coordinates array
  const points = lines.map(p => {
    const cx = p.x * (tileSize + gap) + tileSize / 2;
    const cy = p.y * (tileSize + gap) + tileSize / 2;
    return `${cx},${cy}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  return (
    <svg className="connection-svg" style={{ overflow: 'visible' }}>
      <path className="connection-path" d={pathD} />
    </svg>
  );
};

export default ConnectionLine;
