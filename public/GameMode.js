export default class GameMode {
  constructor() {
    const highScoreStorageKey = this.constructor.HIGH_SCORE_STORAGE_KEY;

    if (!highScoreStorageKey) {
      throw new Error(
        "Subclasses need to define static property HIGH_SCORE_STORAGE_KEY"
      );
    }

    this.highScore = localStorage.getItem(highScoreStorageKey) || 0;
  }

  updateHighScore(score) {
    if (score > this.highScore) {
      this.highScore = score;

      localStorage.setItem(
        this.constructor.HIGH_SCORE_STORAGE_KEY,
        this.highScore
      );
    }
  }
}
