# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-09-06

### Added
- Initial Snake game release
- 20x20 game grid with classic Snake gameplay
- Keyboard controls (Arrow keys and WASD)
- Progressive difficulty - speed increases with score
- Score tracking system
- Restart capability
- Comprehensive README documentation with setup and gameplay instructions
- React + TypeScript + Vite project structure
- ESLint configuration for code quality
- Public and asset management

### Features
- Snake starts with 1 segment and grows when eating food
- Food appears at random positions (never on the snake)
- Each food increases score by 10 points
- Difficulty increases every 5 food items eaten
- Initial game speed: 150ms per move
- Game ends when snake hits walls or itself
- Responsive keyboard input handling
