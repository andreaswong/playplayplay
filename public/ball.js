import { COLOR_MAP, MAX_POINTS } from './constants.js';
import { generateRandomId } from './util.js';

export default function Ball(radius, xPos, yPos, velocityX, velocityY) {
    this.radius = radius;
    this.x = xPos;
    this.y = yPos;
    this.vx = velocityX;
    this.vy = velocityY;
    this.score = Math.round(MAX_POINTS / (2 * radius));
    this.color = COLOR_MAP[this.score];
    this.id = generateRandomId(5);


    this.setVelocityY = function (value) {
        this.vy = value;
    }
    this.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.closePath();
        ctx.fill();
    }
    this.update = function () {
        this.y += this.vy;
    }
    this.clear = function (ctx) {
        ctx.clearRect(
            this.x - this.vx - this.radius,
            this.y - this.vy - this.radius,
            2 * this.radius,
            2 * this.radius);
    }
}