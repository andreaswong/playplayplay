import Game from './game.js';
let game = new Game('dot-game-canvas', window.innerHeight - 120, window.innerWidth);
document.addEventListener("visibilitychange", visibilityChange);

let isBrowserInView = true;
function visibilityChange(e) {
    isBrowserInView = !isBrowserInView;
    if (isBrowserInView) {
        if (game.isGamePaused) {
            game.pauseGame();
        } else {
            game.startGame();
        }
    } else {
        game.pauseGame();
    }
}