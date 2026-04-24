# 🐍 GitHub Contribution Snake Game

A playable Snake game where the levels are generated from your GitHub contribution graph. Eat your green squares (contributions) to grow and increase your score!

![Snake Game Preview](public/preview.png) *(Add a screenshot here later)*

## 🎮 How to Play

1.  **Open the game**: [https://your-username.github.io/snake/](https://your-username.github.io/snake/)
2.  **Controls**: Use **Arrow Keys** or **WASD** to move the snake. Press **Space** to start or pause.
3.  **Objective**: Eat the green squares. The darker the green, the more points you get!
4.  **Custom User**: Add `?user=GITHUB_USERNAME` to the URL to play with anyone's contribution graph.

## 🖼️ Embed in your Profile README

You can add this game directly to your GitHub profile or any website using an `iframe`:

```html
<iFrame 
  src="https://your-username.github.io/snake/?user=your-username" 
  width="100%" 
  height="350" 
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
