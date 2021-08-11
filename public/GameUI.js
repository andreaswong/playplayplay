import Dot from "./Dot.js";
import PlayState from "./PlayState.js";
import TimeAttackMode from "./TimeAttackMode.js";
import SurvivalMode from "./SurvivalMode.js";
import { generateRandInRange } from "./utils.js";

export default class GameUI {
  static getInstance() {
    if (!GameUI.instance) {
      GameUI.instance = new GameUI();
    }

    return GameUI.instance;
  }

  constructor() {
    this.sliderEl = document.getElementById("speed-slider");
    this.speedEl = document.getElementById("speed-value");
    this.scoreEl = document.getElementById("score");
    this.playAreaEl = document.getElementById("play-area");
    this.playPauseButtonEl = document.getElementById("play-pause-button");
    this.pauseOverlayEl = document.getElementById("pause-overlay");
    this.pauseOverlayTextEl = document.getElementById("pause-overlay-text");
    this.postGameOverlayEl = document.getElementById("post-game-overlay");
    this.postGameOverlayTextEl = document.getElementById(
      "post-game-overlay-text"
    );
    this.gameOverTextEl = document.getElementById("game-over-text");
    this.modeSpecificValueEl = document.getElementById("mode-specific-value");
    this.modeSpecificLabelEl = document.getElementById("mode-specific-label");
    this.highScoreContainerEl = document.getElementById("high-score-container");
    this.highScoreEl = document.getElementById("high-score");

    this.handleGameModeSelect = this.handleGameModeSelect.bind(this);
    document.querySelectorAll(".game-mode-button").forEach(node => {
      node.onclick = this.handleGameModeSelect;
    });

    this.pauseOverlayTextEl.innerText = "Paused";
  }

  get selectedSpeed() {
    return this.sliderEl.value;
  }

  setSpeedOnChangeListener(listener) {
    this.sliderEl.oninput = listener;
  }

  setPlayPauseButtonOnClickListener(listener) {
    this.playPauseButtonEl.onclick = listener;
  }

  setDotOnClickListener(listener) {
    this.dotOnClickListener = listener;
  }

  setDotOnMissListener(listener) {
    this.dotOnMissListener = listener;
  }

  setGameModeOnSelectListener(listener) {
    this.gameModeOnSelectListener = listener;
  }

  handleGameModeSelect(event) {
    document.querySelectorAll(".game-mode-button").forEach(node => {
      if (node === event.currentTarget) {
        node.className = "game-mode-button selected";
      } else {
        node.className = "game-mode-button";
      }
    });

    let gameMode;

    if (event.currentTarget.id === "time-attack-mode-button") {
      gameMode = new TimeAttackMode();
    } else if (event.currentTarget.id === "survival-mode-button") {
      gameMode = new SurvivalMode();
    } else {
      throw new Error("Unsupported Game Mode");
    }

    if (this.gameModeOnSelectListener) {
      this.gameModeOnSelectListener(gameMode);
    }

    this.postGameOverlayTextEl.innerText = "Press START to begin";
    this.playPauseButtonEl.disabled = false;
    this.highScoreContainerEl.className = "";
  }

  updateOverlayDisplay(gameState) {
    if (!gameState) return;

    if (
      !this.prevGameState ||
      gameState.playState !== this.prevGameState.playState
    ) {
      switch (gameState.playState) {
        case PlayState.GAMEOVER:
          this.gameOverTextEl.className = "";
        // No break statement intentionally
        case PlayState.PREGAME:
          this.postGameOverlayEl.className = "";
          this.pauseOverlayEl.className = "hidden";
          break;
        case PlayState.PAUSED:
          this.postGameOverlayEl.className = "hidden";
          this.pauseOverlayEl.className = "";
          break;
        default:
          this.postGameOverlayEl.className = "hidden";
          this.pauseOverlayEl.className = "hidden";
      }
    }
  }

  updateSpeedDisplay(speed) {
    if (!this.prevGameState || speed !== this.prevGameState.speed) {
      this.speedEl.innerText = speed;
    }
  }

  updatePlayPauseButtonDisplay(gameState) {
    if (!gameState) return;

    if (
      !this.prevGameState ||
      gameState.playState !== this.prevGameState.playState
    ) {
      this.playPauseButtonEl.innerText = gameState.isPlaying()
        ? "Pause"
        : "Start";
    }
  }

  updateScoreDisplay(score) {
    if (!this.prevGameState || score !== this.prevGameState.score) {
      this.scoreEl.innerText = score;
    }
  }

  updateModeSpecificDisplay(gameState, gameMode) {
    if (!gameState || !gameMode) return;

    const { label, value } = gameMode.getModeSpecificDisplay(gameState);
    this.modeSpecificValueEl.innerText = value;
    this.modeSpecificLabelEl.innerText = label;
    this.highScoreEl.innerText = gameMode.highScore;
  }

  updateDisplay(gameState, gameMode) {
    if (!gameState) return;

    this.updateSpeedDisplay(gameState.speed);
    this.updatePlayPauseButtonDisplay(gameState);
    this.updateOverlayDisplay(gameState);
    this.updateScoreDisplay(gameState.score);
    this.updateModeSpecificDisplay(gameState, gameMode);
    this.prevGameState = { ...gameState };
  }

  generateRandomDot() {
    const dot = new Dot(
      generateRandInRange(0, 100),
      generateRandInRange(Dot.MIN_DIAMETER_PX, Dot.MAX_DIAMETER_PX, 10)
    );
    dot.onclick = this.dotOnClickListener;
    this.playAreaEl.appendChild(dot);
  }

  updateDotsPositions(dropDistance) {
    this.playAreaEl.querySelectorAll(".dot").forEach(dot => {
      dot.dropBy(dropDistance);
      if (dot.hasFallenOutOfParentNode()) {
        dot.removeFromPlay();

        if (this.dotOnMissListener) {
          this.dotOnMissListener();
        }
      }
    });
  }

  fadeAndRemoveDotFromPlay(dot) {
    dot.fadeAndRemoveFromPlay();
  }

  removeAllDots() {
    this.playAreaEl.querySelectorAll(".dot").forEach(dot => {
      dot.removeFromPlay();
    });
  }
}
