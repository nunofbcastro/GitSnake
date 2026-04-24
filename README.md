# 🐍 GitHub Contribution Snake Game

A playable Snake game where the levels are generated from your GitHub contribution graph. Eat your green squares (contributions) to grow and increase your score!

![Snake Game Preview](public/preview.png) *(Add a screenshot here later)*

## 🎮 How to Play

1.  **Open the game**: [https://your-username.github.io/snake/](https://your-username.github.io/snake/)
2.  **Controls**: Use **Arrow Keys** or **WASD** to move the snake. Press **Space** to start or pause.
3.  **Objective**: Eat the green squares. The darker the green, the more points you get!
4.  **Custom User**: Add `?user=GITHUB_USERNAME` to the URL to play with anyone's contribution graph.

## 🕹️ Play Now!

Since GitHub READMEs don't support interactive games directly, click the image below to play with your own contribution graph:

[![Play GitSnake](https://img.shields.io/badge/PLAY-GitSnake-2ea44f?style=for-the-badge&logo=github)](https://nunofbcastro.github.io/GitSnake/?user=nunobcastro)

*(Or click the grid below)*

[<img src="https://raw.githubusercontent.com/nunofbcastro/GitSnake/main/public/favicon.svg" width="100%" alt="Play GitSnake" />](https://nunofbcastro.github.io/GitSnake/?user=nunobcastro)

## 🖼️ Embed on your own Website

If you are using this on a personal website (not GitHub), you can use this `iframe`:

```html
<iframe 
  src="https://nunofbcastro.github.io/GitSnake/?user=your-username" 
  width="100%" 
  height="300" 
  frameborder="0"
></iframe>
```

## 🛠️ Tech Stack

*   **React + TypeScript**: Frontend logic.
*   **Vite**: Build tool and dev server.
*   **CSS Custom Properties**: GitHub-themed styling.
*   **GitHub Actions**: Automatic deployment to GitHub Pages.
*   **Docker**: Multi-stage build for easy deployment.

## 🚀 Local Development

### Prerequisites
*   Node.js (version specified in `.nvmrc`)
*   npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/snake.git
   cd snake
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Docker
To run using Docker:
```bash
docker build -t github-snake-game .
docker run -p 8080:80 github-snake-game
```
Then open `http://localhost:8080`.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Created with 💚 for the GitHub community.

**Note:** This entire project — from game logic to CI/CD pipelines and documentation — was autonomously built and configured by **Gemini CLI**.
