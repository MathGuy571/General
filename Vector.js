export class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }

  subtract(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  scale(n) {
    this.x *= n
    this.y *= n
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  magn() {
    return Math.hypot(this.x, this.y)
  }

  norm() {
    const mg = this.magn()
    this.x /= mg
    this.y /= mg
  }
}
