import { Vector } from './Vector.js'
import { map } from './Utilities.js'

export class Joystick {
  constructor(W, H) {
    //joypad
    this.p = new Vector(W / 4, (5 * H) / 6)
    this.pr = 40
    //joystick
    this.s = new Vector(W / 4, (5 * H) / 6)
    this.sr = 20

    this.down = false
    this.nv = new Vector(0, 0)
    this.maxMove = 3 //max movement speed

    this.H = H
    this.W = W
  }

  start(e) {
    this.down = true
    this.move(e)
  }

  move(e) {
    this.s.x = e.touches[0].clientX
    this.s.y = e.touches[0].clientY

    //contain joystick within joypad
    const dist = Math.min(Math.hypot(this.s.x - this.p.x, this.s.y - this.p.y), this.pr)
    const θ = Math.atan2(this.s.y - this.p.y, this.s.x - this.p.x)
    this.s.x = this.p.x + dist * Math.cos(θ)
    this.s.y = this.p.y + dist * Math.sin(θ)

    //convert user input to player movement
    this.nv.x = this.s.x - this.p.x
    this.nv.y = this.s.y - this.p.y
    //normalise the vector
    this.nv.norm()
    //scale the normalised vector according to joystick distance from joypad center
    const mapedDist = map(dist, 0, this.pr, 0, this.maxMove)
    this.nv.scale(mapedDist)
  }

  end(e) {
    this.down = false
    this.s.x = this.W / 4
    this.s.y = (5 * this.H) / 6
  }

  draw(ctx) {
    //joypad
    ctx.beginPath()
    ctx.arc(this.p.x, this.p.y, this.pr, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgba(0, 100, 255, 0.6)'
    ctx.fill()
    ctx.closePath()
    //joystick
    ctx.beginPath()
    ctx.arc(this.s.x, this.s.y, this.sr, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgba(255, 100, 0, 0.6)'
    ctx.fill()
    ctx.closePath()
  }
}
