import GameMode from "./GameMode.js";

export default class SurvivalMode extends GameMode {
  static NUMBER_OF_LIVES = 3;
  static HIGH_SCORE_STORAGE_KEY = "survivalModeHighScore";

  isGameOver(gameState) {
    return gameState.missedDots >= SurvivalMode.NUMBER_OF_LIVES;
  }

  getModeSpecificDisplay(gameState) {
    const missedDots = Math.min(
      gameState.missedDots,
      SurvivalMode.NUMBER_OF_LIVES
    );
    const remainingLives = SurvivalMode.NUMBER_OF_LIVES - missedDots;

    return {
      label: "Lives",
      value: `${"❤️".repeat(remainingLives)}${"💀".repeat(missedDots)}`
    };
  }
}
