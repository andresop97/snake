import { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Coordinate = [number, number];

const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 150;

export function SnakeGame() {
  const [snake, setSnake] = useState<Coordinate[]>([[10, 10]]);
  const [food, setFood] = useState<Coordinate>([15, 15]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate random food position
  const generateFood = (snakeBody: Coordinate[]): Coordinate => {
    let newFood: Coordinate;
    do {
      newFood = [
        Math.floor(Math.random() * GRID_WIDTH),
        Math.floor(Math.random() * GRID_HEIGHT),
      ];
    } while (snakeBody.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
    return newFood;
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGameStarted) return;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          if (direction !== 'DOWN') setNextDirection('UP');
          e.preventDefault();
          break;
        case 'arrowdown':
        case 's':
          if (direction !== 'UP') setNextDirection('DOWN');
          e.preventDefault();
          break;
        case 'arrowleft':
        case 'a':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          e.preventDefault();
          break;
        case 'arrowright':
        case 'd':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isGameStarted]);

  // Game loop
  useEffect(() => {
    if (!isGameStarted || isGameOver) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        setDirection(nextDirection);
        
        const head = prevSnake[0];
        let newHead: Coordinate;

        switch (nextDirection) {
          case 'UP':
            newHead = [head[0], (head[1] - 1 + GRID_HEIGHT) % GRID_HEIGHT];
            break;
          case 'DOWN':
            newHead = [head[0], (head[1] + 1) % GRID_HEIGHT];
            break;
          case 'LEFT':
            newHead = [(head[0] - 1 + GRID_WIDTH) % GRID_WIDTH, head[1]];
            break;
          case 'RIGHT':
            newHead = [(head[0] + 1) % GRID_WIDTH, head[1]];
            break;
        }

        // Check collision with itself
        if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setIsGameOver(true);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        // Check collision with food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(prev => prev + 10);
          setFood(generateFood(newSnake));
          setSpeed(prev => Math.max(50, prev - 2));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isGameStarted, isGameOver, food, speed, nextDirection]);

  const startGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
    setIsGameStarted(true);
    setSpeed(INITIAL_SPEED);
  };

  const togglePause = () => {
    setIsGameStarted(!isGameStarted);
  };

  return (
    <div className="snake-game-container">
      <h1>🐍 Snake Game</h1>
      
      <div className="game-info">
        <div className="score-board">
          <h2>Score: {score}</h2>
          <p>Length: {snake.length}</p>
        </div>
      </div>

      <div
        className="game-board"
        style={{
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
        }}
      >
        {/* Render grid cells */}
        {Array.from({ length: GRID_HEIGHT }).map((_, y) =>
          Array.from({ length: GRID_WIDTH }).map((_, x) => {
            const isSnakeHead = snake[0][0] === x && snake[0][1] === y;
            const isSnakeBody = snake.some(segment => segment[0] === x && segment[1] === y);
            const isFood = food[0] === x && food[1] === y;

            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${isSnakeHead ? 'snake-head' : ''} ${
                  isSnakeBody ? 'snake-body' : ''
                } ${isFood ? 'food' : ''}`}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              />
            );
          })
        )}
      </div>

      <div className="controls">
        {!isGameStarted && !isGameOver && (
          <button className="btn btn-primary" onClick={startGame}>
            Start Game
          </button>
        )}
        {isGameStarted && !isGameOver && (
          <button className="btn btn-secondary" onClick={togglePause}>
            Pause
          </button>
        )}
        {(isGameStarted && isGameOver) || (!isGameStarted && isGameOver) ? (
          <>
            <button className="btn btn-danger" disabled>
              Game Over!
            </button>
            <button className="btn btn-primary" onClick={startGame}>
              Play Again
            </button>
          </>
        ) : null}
        {isGameStarted && !isGameOver && (
          <button className="btn btn-danger" onClick={() => setIsGameOver(true)}>
            Quit
          </button>
        )}
      </div>

      <div className="instructions">
        <h3>Controls</h3>
        <p>Use <strong>Arrow Keys</strong> or <strong>WASD</strong> to move</p>
        <p>Eat food to grow and increase your score</p>
        <p>Don't hit yourself!</p>
      </div>
    </div>
  );
}
