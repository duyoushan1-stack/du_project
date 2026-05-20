function f2c(f) {
  return Math.round((((f - 32) * 5) / 9) * 10) / 10
}
function c2f(c) {
  return Math.round(((c * 9) / 5 + 32) * 10) / 10
}

export { f2c, c2f }
