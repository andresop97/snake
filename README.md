# Snake Game

A classic Snake game built with React, TypeScript, and Vite. Control the snake to eat food and grow longer while avoiding collisions with the walls and yourself.

## Features

- 🎮 Classic Snake gameplay on a 20x20 grid
- ⌨️ Keyboard controls (Arrow keys or WASD)
- 📊 Score tracking with difficulty progression
- 🎯 Progressive difficulty - speed increases as you score
- 🔄 Restart capability
- 💨 Smooth animations and responsive controls
- 📱 Clean, modern UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd snake
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. Click "Start Game" or press any arrow key to begin
2. Use **Arrow Keys** or **WASD** to control the snake's direction
3. Eat the red food squares to grow and increase your score
4. Avoid hitting the walls or your own body
5. Each time you eat 5 pieces of food, the game speeds up
6. When you crash, click "Game Over - Start New Game" to play again

## Game Rules

- The snake starts with 1 segment at the center of the grid
- Food appears at random positions (excluding snake's current position)
- Each food eaten increases score by 10 points
- Moving into walls or the snake's body ends the game
- Difficulty increases every 5 food items eaten
- Initial speed: 150ms per move

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
snake/
├── src/
│   ├── App.tsx              # Main application component
│   ├── SnakeGame.tsx        # Game logic and component
│   ├── App.css              # Main styles
│   ├── SnakeGame.css        # Game-specific styles
│   ├── index.css            # Global styles
│   ├── main.tsx             # React entry point
│   └── assets/              # Static assets
├── public/                  # Public static files
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## Development

The game is built as a single React component with:
- `useState` for state management
- `useEffect` for event listeners
- `useRef` for game loop reference
- CSS for styling and animations

### Key Components

- **SnakeGame.tsx** - Contains the main game logic including:
  - Snake movement and collision detection
  - Food generation and consumption
  - Score and speed management
  - Game state management

## Tips for Winning

- Plan your moves ahead
- Avoid trapping yourself in corners
- The center of the grid provides more movement options
- Focus on surviving longer to increase your score multiplier

## License

This project is open source and available for personal and educational use.

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

Enjoy the game! 🐍
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
