import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ContributionDay } from '../utils/githubFetcher';
import '../styles/game.css';

interface SnakeGameProps {
  days: ContributionDay[];
  username: string;
}

type Point = { x: number; y: number };

const GRID_WIDTH = 53;
const GRID_HEIGHT = 7;

export const SnakeGame: React.FC<SnakeGameProps> = ({ days, username }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [snake, setSnake] = useState<Point[]>([{ x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 }]);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const nextDirection = useRef<Point>({ x: 1, y: 0 });

  // Initialize grid from contribution days
  useEffect(() => {
    const newGrid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
    
    days.forEach((day, index) => {
      const col = Math.floor(index / 7);
      const row = index % 7;
      if (col < GRID_WIDTH && row < GRID_HEIGHT) {
        newGrid[row][col] = day.level;
      }
    });
    
    // Clear initial snake positions
    const initialSnake = [{ x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 }];
    initialSnake.forEach(p => {
      if (newGrid[p.y] && newGrid[p.y][p.x] !== undefined) {
        newGrid[p.y][p.x] = 0;
      }
    });
    
    setGrid(newGrid);
    setSnake(initialSnake);
  }, [days]);

  const gridRef = useRef<number[][]>([]);
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (direction.y === 0) nextDirection.current = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
      case 's':
        if (direction.y === 0) nextDirection.current = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
      case 'a':
        if (direction.x === 0) nextDirection.current = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
      case 'd':
        if (direction.x === 0) nextDirection.current = { x: 1, y: 0 };
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setDirection(nextDirection.current);
    
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + nextDirection.current.x,
        y: head.y + nextDirection.current.y
      };

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_WIDTH ||
        newHead.y < 0 || newHead.y >= GRID_HEIGHT ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const currentGrid = gridRef.current;
      const cellValue = currentGrid[newHead.y][newHead.x];
      const newSnake = [newHead, ...prevSnake];

      if (cellValue > 0) {
        // Eat contribution
        setScore(prev => prev + (cellValue * 10));
        setGrid(prevGrid => {
          const updatedGrid = [...prevGrid];
          updatedGrid[newHead.y] = [...updatedGrid[newHead.y]];
          updatedGrid[newHead.y][newHead.x] = 0;
          return updatedGrid;
        });
        // Snake grows: don't pop the tail
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, isPaused]); // Removed grid as dependency to avoid interval stutter

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 130);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake([{ x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 }]);
    setDirection({ x: 1, y: 0 });
    nextDirection.current = { x: 1, y: 0 };
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    
    // Reset grid
    const newGrid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
    days.forEach((day, index) => {
      const col = Math.floor(index / 7);
      const row = index % 7;
      if (col < GRID_WIDTH && row < GRID_HEIGHT) {
        newGrid[row][col] = day.level;
      }
    });
    setGrid(newGrid);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="stats">
          <span>User: <strong>{username}</strong></span>
          <span>Score: <strong>{score}</strong></span>
        </div>
        <button onClick={resetGame}>{gameOver ? 'Restart' : isPaused ? 'Start' : 'Reset'}</button>
      </div>
      
      <div className="grid">
        {grid.map((row, y) => (
          row.map((level, x) => {
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.slice(1).some(s => s.x === x && s.y === y);
            
            return (
              <div 
                key={`${x}-${y}`} 
                className={`cell level-${level} ${isSnakeHead ? 'snake-head' : ''} ${isSnakeBody ? 'snake-body' : ''}`}
              />
            );
          })
        ))}
        
        {gameOver && (
          <div className="overlay">
            <h2>Game Over!</h2>
            <p>Score: {score}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
        
        {isPaused && !gameOver && (
          <div className="overlay">
            <h2>Snake vs Contributions</h2>
            <p>Use Arrow Keys or WASD to move.</p>
            <p>Space to Start/Pause.</p>
            <button onClick={() => setIsPaused(false)}>Start Game</button>
          </div>
        )}
      </div>
    </div>
  );
};
