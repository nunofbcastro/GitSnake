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
const INITIAL_SPEED = 200;
const MIN_SPEED = 80;

export const SnakeGame: React.FC<SnakeGameProps> = ({ days, username }) => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [snake, setSnake] = useState<Point[]>([{ x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 }]);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [eatenCells, setEatenCells] = useState<Set<string>>(new Set());
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const nextDirection = useRef<Point>({ x: 1, y: 0 });

  // Initialize grid from contribution days
  useEffect(() => {
    const newGrid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
    const initialEaten = new Set<string>();
    
    days.forEach((day, index) => {
      const col = Math.floor(index / 7);
      const row = index % 7;
      if (col < GRID_WIDTH && row < GRID_HEIGHT) {
        newGrid[row][col] = day.level;
      }
    });
    
    // Clear initial snake positions and mark them as eaten if they had value
    const initialSnake = [{ x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 }];
    initialSnake.forEach(p => {
      if (newGrid[p.y] && newGrid[p.y][p.x] > 0) {
        initialEaten.add(`${p.x}-${p.y}`);
        newGrid[p.y][p.x] = 0;
      }
    });
    
    setGrid(newGrid);
    setSnake(initialSnake);
    setEatenCells(initialEaten);
  }, [days]);

  const gridRef = useRef<number[][]>([]);
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default scrolling for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (nextDirection.current.y === 0) nextDirection.current = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (nextDirection.current.y === 0) nextDirection.current = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (nextDirection.current.x === 0) nextDirection.current = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (nextDirection.current.x === 0) nextDirection.current = { x: 1, y: 0 };
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { passive: false });
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

      // Check collisions with walls or self
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
        const points = cellValue * 10;
        setScore(prev => prev + points);

        setEatenCells(prev => new Set(prev).add(`${newHead.x}-${newHead.y}`));
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
  }, [gameOver, isPaused]);

  // Use dynamic interval based on speed with robust setTimeout to prevent burst-firing
  useEffect(() => {
    if (gameOver || isPaused) return;
    
    let timeoutId: number;
    const runLoop = () => {
      moveSnake();
      timeoutId = window.setTimeout(runLoop, INITIAL_SPEED); // CONSTANT SPEED
    };
    
    timeoutId = window.setTimeout(runLoop, INITIAL_SPEED);
    return () => window.clearTimeout(timeoutId);
  }, [moveSnake, gameOver, isPaused]);

  const resetGame = () => {
    setSnake([{ x: 2, y: 3 }, { x: 1, y: 3 }, { x: 0, y: 3 }]);
    setDirection({ x: 1, y: 0 });
    nextDirection.current = { x: 1, y: 0 };
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    setEatenCells(new Set());
    
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
          <div className="stat-pill">
            <span className="stat-label">User</span>
            <span className="stat-value">{username}</span>
          </div>
          <div className="stat-pill highlight">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
        </div>
        <button className="control-btn" onClick={resetGame}>
          {gameOver ? 'Restart' : isPaused ? 'Start' : 'Reset'}
        </button>
      </div>
      
      <div className="grid-wrapper">
        <div className="grid">
          {grid.map((row, y) => (
            row.map((level, x) => {
              const headSegment = snake[0].x === x && snake[0].y === y;
              const bodySegmentIndex = snake.findIndex((s, i) => i > 0 && s.x === x && s.y === y);
              const isSnakeBody = bodySegmentIndex !== -1;
              const isEaten = eatenCells.has(`${x}-${y}`);
              
              let classNames = `cell level-${level}`;
              if (isEaten) classNames += ' level-0-eaten';
              if (headSegment) classNames += ' snake-head';
              if (isSnakeBody) classNames += ' snake-body';
              
              return <div key={`${x}-${y}`} className={classNames} />;
            })
          ))}

          {gameOver && (
            <div className="overlay glass">
              <h2 className="gradient-text">Game Over!</h2>
              <div className="final-score">Score: {score}</div>
              <button className="primary-btn" onClick={resetGame}>Play Again</button>
            </div>
          )}
          
          {isPaused && !gameOver && (
            <div className="overlay glass">
              <h2 className="gradient-text">Snake vs Contributions</h2>
              <div className="instructions">
                <p><span>WASD / Arrows</span> to move</p>
                <p><span>Spacebar</span> to Start/Pause</p>
              </div>
              <button className="primary-btn" onClick={() => setIsPaused(false)}>Start Game</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
