import { generateRandInRange } from "./utils.js";

export default class Dot extends HTMLElement {
  static MIN_DIAMETER_PX = 10;
  static MAX_DIAMETER_PX = 100;
  static MIN_POINT_VALUE = 1;
  static MAX_POINT_VALUE = 10;

  static COLORS = ["#E54360", "#006098", "#18988B", "#F6D44D"];

  constructor(centerXPercentage, diameter) {
    super();
    this.centerXPercentage = centerXPercentage;
    this.bottomY = 0;
    this.diameter = diameter;
    this.initializeStyles();
  }

  get pointValue() {
    return Math.round(
      Dot.MIN_POINT_VALUE +
        ((Dot.MAX_POINT_VALUE - Dot.MIN_POINT_VALUE) *
          (Dot.MAX_DIAMETER_PX - this.diameter)) /
          (Dot.MAX_DIAMETER_PX - Dot.MIN_DIAMETER_PX)
    );
  }

  get radius() {
    return this.diameter / 2;
  }

  get topY() {
    return this.bottomY - this.diameter;
  }

  get styleLeft() {
    // This value is actually the centerX. The actual positioning
    // of the left edge is taken care by the transform
    return `calc(${this.centerXPercentage}% + ${(this.diameter *
      (50 - this.centerXPercentage)) /
      100}px)`;
  }

  hasFallenOutOfParentNode() {
    if (this.parentNode) {
      return this.topY > this.parentNode.clientHeight;
    }
    return false;
  }

  fadeAndRemoveFromPlay() {
    this.ontransitionend = () => {
      this.removeFromPlay();
    };

    this.onclick = null;
    this.className += " invisible";
  }

  removeFromPlay() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }

  initializeStyles() {
    this.className = "dot";
    this.style.width = `${this.diameter}px`;
    this.style.height = `${this.diameter}px`;
    this.style.left = this.styleLeft;
    this.style.transform = `translate(-${this.radius}px,-${this.diameter}px)`;
    this.updatePositionStyles();

    const color = Dot.COLORS[generateRandInRange(0, Dot.COLORS.length - 1)];
    this.style["border-color"] = color;
    this.style["background-color"] = `${color}BB`;
  }

  updatePositionStyles() {
    this.style.top = `${this.bottomY}px`;
  }

  dropBy(numberOfPixels) {
    this.bottomY += numberOfPixels;
    this.updatePositionStyles();
  }
}

window.customElements.define("custom-dot", Dot);
