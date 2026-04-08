import { useState, useEffect, useCallback } from 'react';
import { generateBoard, getLogicBoard, shuffleBoard } from '../core/boardHelpers';
import { checkPath } from '../core/pathfinding';

export const useGameLogic = (cols = 12, rows = 8, timeLimit = 300) => {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lines, setLines] = useState(null); // stores the path to draw
  
  const initGame = useCallback(() => {
    setBoard(generateBoard(cols, rows));
    setScore(0);
    setTimeLeft(timeLimit);
    setIsPlaying(true);
    setIsGameOver(false);
    setSelected(null);
    setLines(null);
  }, [cols, rows, timeLimit]);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleTileClick = (x, y) => {
    if (!isPlaying || board[y][x].isEmpty) return;

    if (!selected) {
      setSelected({ x, y, emoji: board[y][x].emoji });
      return;
    }

    if (selected.x === x && selected.y === y) {
      // Click same tile -> deselect
      setSelected(null);
      return;
    }

    // Different tile clicked
    const targetEmoji = board[y][x].emoji;
    
    if (selected.emoji !== targetEmoji) {
      // Not matching
      setSelected({ x, y, emoji: targetEmoji });
      return;
    }

    // Matching emojis. Check path.
    const logicBoard = getLogicBoard(board, cols, rows);
    const path = checkPath(logicBoard, cols, rows, selected, {x, y});

    if (path) {
      // Valid Match
      setLines(path);
      setIsPlaying(false); // pause slightly for animation

      setTimeout(() => {
        setBoard(prev => {
          const newBoard = [...prev];
          newBoard[selected.y][selected.x] = { ...newBoard[selected.y][selected.x], isEmpty: true };
          newBoard[y][x] = { ...newBoard[y][x], isEmpty: true };
          return newBoard;
        });
        setScore(s => s + 10);
        setSelected(null);
        setLines(null);
        setIsPlaying(true);
      }, 400); // 400ms for line animation
    } else {
      // Invalid path, switch selection
      setSelected({ x, y, emoji: targetEmoji });
    }
  };

  const shuffle = () => {
    if (!isPlaying) return;
    setBoard(shuffleBoard(board, cols, rows));
    setSelected(null);
  };

  return {
    board,
    selected,
    score,
    timeLeft,
    isPlaying,
    isGameOver,
    lines,
    initGame,
    handleTileClick,
    shuffle
  };
};
