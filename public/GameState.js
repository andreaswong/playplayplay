import PlayState from "./PlayState.js";

export default class GameState {
  constructor() {
    this.score = 0;
    this.totalGameTime = 0;
    this.missedDots = 0;
    this.playState = PlayState.PREGAME;
  }

  isPlaying() {
    return this.playState === PlayState.PLAYING;
  }

  incrementScoreBy(increment) {
    this.score += increment;
  }

  resetScore() {
    this.score = 0;
  }

  incrementTotalGameTime(increment) {
    this.totalGameTime += increment;
  }

  resetTotalGameTime() {
    this.totalGameTime = 0;
  }

  incrementMissedDots() {
    this.missedDots += 1;
  }

  resetMissedDots() {
    this.missedDots = 0;
  }

  reset() {
    this.resetScore();
    this.resetTotalGameTime();
    this.resetMissedDots();
  }

  setPlayState(playState) {
    this.playState = playState;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  togglePlayState() {
    this.playState = this.isPlaying() ? PlayState.PAUSED : PlayState.PLAYING;
  }
}
