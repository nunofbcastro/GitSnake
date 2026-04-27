# 🐍 GitSnake: GitHub Contribution Snake Game

<p align="center">
  <img src="https://raw.githubusercontent.com/nunofbcastro/GitSnake/main/public/favicon.svg" alt="GitSnake Logo" width="120" />
</p>

<p align="center">
  <strong>A premium, playable Snake game where the levels are generated directly from your GitHub contribution graph!</strong>
  <br />
  Eat your green squares (contributions) to grow, increase your speed, and boost your score!
</p>

---

## ✨ Features (New!)

- **Premium UI/UX:** Stunning glassmorphism overlays, smooth gradient backgrounds, and modern typography (`Outfit` font).
- **Dynamic Gameplay:** The snake speeds up as your score increases, making the game progressively more challenging.
- **Neon Glow Aesthetics:** The snake and the highest contribution squares feature a beautiful neon glow, making it easy to distinguish the snake body from the grid.
- **Responsive Controls:** Improved movement logic to prevent accidental instant "Game Overs" from double key-presses.
- **Play with Anyone:** Play the game using *any* GitHub user's contribution graph by simply changing the URL parameter.

## 🎮 How to Play

1.  **Open the game**: [https://nunofbcastro.github.io/GitSnake/](https://nunofbcastro.github.io/GitSnake/)
2.  **Controls**: Use **Arrow Keys** or **WASD** to move the snake. Press **Space** to start or pause.
3.  **Objective**: Eat the green squares. The darker the green, the more points you get!
4.  **Custom User**: Add `?user=GITHUB_USERNAME` to the URL to play with anyone's contribution graph.

## 🕹️ Play Now!

Since GitHub READMEs don't support interactive games directly, click the badge below to play with your own contribution graph:

[![Play GitSnake](https://img.shields.io/badge/PLAY-GitSnake-2ea44f?style=for-the-badge&logo=github)](https://nunofbcastro.github.io/GitSnake/?user=nunobcastro)

## 🖼️ Embed on your own Website

If you are using this on a personal website or portfolio, you can easily embed it using an `iframe`:

```html
<iframe 
  src="https://nunofbcastro.github.io/GitSnake/?user=your-username" 
  width="100%" 
  height="400" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
></iframe>
```

## 🛠️ Tech Stack

*   **React + TypeScript**: Frontend game logic and rendering.
*   **Vite**: Lightning-fast build tool and dev server.
*   **Modern CSS**: Glassmorphism, CSS Variables, and responsive flex/grid layouts.
*   **GitHub Actions**: Automatic deployment to GitHub Pages.
*   **Docker**: Multi-stage build for easy local deployment.

## 🚀 Local Development

### Prerequisites
*   Node.js (version specified in `.nvmrc`)
*   npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/nunofbcastro/GitSnake.git
   cd GitSnake
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
<p align="center">
  Created with 💚 for the GitHub community.<br/>
  <strong>Note:</strong> This entire project was autonomously built and configured by <strong>Gemini CLI</strong>.
</p>
