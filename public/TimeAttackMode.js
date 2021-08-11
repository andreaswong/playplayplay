import GameMode from "./GameMode.js";

export default class TimeAttackMode extends GameMode {
  static GAME_DURATION = 60000;
  static HIGH_SCORE_STORAGE_KEY = "timeAttackModeHighScore";

  isGameOver(gameState) {
    return gameState.totalGameTime >= TimeAttackMode.GAME_DURATION;
  }

  getModeSpecificDisplay(gameState) {
    return {
      label: "Time",
      value: Math.ceil(
        (TimeAttackMode.GAME_DURATION - gameState.totalGameTime) / 1000
      )
    };
  }
}
