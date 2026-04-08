import React, { useEffect } from 'react';
import Board from './components/Board';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const COLS = 12;
  const ROWS = 8;
  const TIME_LIMIT = 300;

  const {
    board,
    selected,
    score,
    timeLeft,
    isPlaying,
    isGameOver,
    lines,
    shuffleCount,
    hintTiles,
    initGame,
    handleTileClick,
    shuffle,
    useHint
  } = useGameLogic(COLS, ROWS, TIME_LIMIT);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app-container">
      <header>
        <div className="title">Onet Connect</div>
        <div className="stats">
          <span>Score: {score}</span>
          <span>Time: {formatTime(timeLeft)}</span>
        </div>
        <div className="controls">
          <button className="hint" onClick={useHint} disabled={!isPlaying}>Hint</button>
          <button className="shuffle" onClick={shuffle} disabled={!isPlaying || shuffleCount <= 0}>
            Shuffle ({shuffleCount})
          </button>
          <button onClick={initGame}>Restart</button>
        </div>
      </header>
      
      {board.length > 0 && (
        <Board 
          board={board}
          cols={COLS}
          rows={ROWS}
          selected={selected}
          onTileClick={handleTileClick}
          lines={lines}
          isGameOver={isGameOver}
          isPlaying={isPlaying}
          hintTiles={hintTiles}
        />
      )}
    </div>
  );
}

export default App;
