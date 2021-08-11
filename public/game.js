import Ball from "./ball.js";
import * as Util from "./util.js";

export default class Game {
  constructor(id, height, width) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    this.scoreTextHTMLEl = document.getElementById("score-text");
    this.speedInputHTMLEl = document.getElementById("speed-input");
    this.startButton = document.getElementById("play-pause-btn");

    this.canvas.width = width;
    this.canvas.height = height;

    this.startGameId;
    this.intervalNumber;
    this.score = 0;
    this.ballsOnScreen = [];
    this.isGamePaused = true;
    this.scoreTextHTMLEl.innerHTML = this.score;
    this.startButton.innerHTML = "Start";

    this.applyListeners();
  }

  createBall() {
    const radius = Util.getRandomRadius();
    const xPos = Util.getRandomPosition(
      2 * radius,
      this.canvas.width - 2 * radius
    );
    const yPos = radius;
    const velocityY = parseFloat(this.speedInputHTMLEl.value, 10);
    const velocityX = 0;

    const newBall = new Ball(radius, xPos, yPos, velocityX, velocityY);
    this.ballsOnScreen.push(newBall);
  }

  applyListeners() {
    this.speedInputHTMLEl.addEventListener("change", e => {
      this.ballsOnScreen.forEach(ball => {
        ball.setVelocityY(parseFloat(e.target.value, 10));
      });
    });

    this.startButton.addEventListener("click", () => {
      this.updateGameStatus();
    });

    this.canvas.addEventListener("click", e => {
      const pos = {
        x: e.clientX - this.canvas.offsetLeft,
        y: e.clientY - this.canvas.offsetTop
      };

      this.ballsOnScreen = this.ballsOnScreen.filter(ball => {
        if (Util.isIntersect(pos, ball)) {
          this.score += ball.score;
          this.scoreTextHTMLEl.innerHTML = this.score;
          ball.clear(this.ctx);
          return false;
        } else {
          return true;
        }
      });
    });
  }
  filterBallsOnScreen(ballToRemove) {
    this.ballsOnScreen = this.ballsOnScreen.filter(ball => {
      return ball.id !== ballToRemove.id;
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  startGame() {
    this.startGameId = requestAnimationFrame(() => this.update());
    this.intervalNumber = setInterval(() => this.createBall(), 1000);
  }

  pauseGame() {
    cancelAnimationFrame(this.startGameId);
    clearInterval(this.intervalNumber);
  }

  update() {
    this.clearCanvas();

    for (let i = 0, ball; (ball = this.ballsOnScreen[i]); i++) {
      ball.draw(this.ctx);
      ball.update(this.ctx);
      if (ball.y + ball.radius > this.canvas.height) {
        this.filterBallsOnScreen(ball);
      }
    }
    this.startGameId = requestAnimationFrame(() => this.update());
  }

  updateGameStatus() {
    if (this.isGamePaused) {
      this.startGame();
    } else {
      this.pauseGame();
    }
    this.isGamePaused = !this.isGamePaused;
    this.startButton.innerHTML = this.isGamePaused ? "Start" : "Pause";
  }
}
