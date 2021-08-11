export function generateRandInRange(min, max, step = 1) {
  return Math.round((min + Math.random() * (max - min)) / step) * step;
}

export function hasSecondsDigitChanged(newTimestamp, prevTimestamp) {
  return Math.floor(newTimestamp / 1000) > Math.floor(prevTimestamp / 1000);
}

export function isFunction(target) {
  return typeof target === "function";
}
