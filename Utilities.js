/**
 * Returns a random number within a specified range
 * @param {number} min
 * @param {number} max
 * @example: let rand = random(-10, 10)
 * will return a random number between -10 & 10
 */
export const random = (min, max) => {
  if (min == undefined && max == undefined) {
    min = 0
    max = 1
  } else if (max == undefined) {
    const temp = min
    min = 0
    max = temp
  }

  return Math.random() * (max - min) + min
}

export class FpsDiv {
  /**
   *
   * @param {string} id -> id of fps div
   * @param {string} top -> margin from top of the screen
   * @param {string} left -> margin from left of the screen
   * @param {string} color -> color format string
   * @example:`let fps = new FpsDiv("Fps", "15px", "20px", "#3f0")`
   */
  constructor(id, top, left, color) {
    this.div = document.createElement('div')
    //set id
    this.div.id = id
    //set style
    this.div.style.position = 'absolute'
    this.div.style.top = top
    this.div.style.left = left
    this.div.style.color = color
    //set creation timestamp
    this.time = performance.now()
    //append fps div to body
    const body = document.getElementsByTagName('BODY')[0]
    body.appendChild(this.div)
  }

  calc() {
    const dt = performance.now() - this.time
    this.time = performance.now()
    this.div.innerText = `fps: ${Math.round(1000 / dt)}`
  }
}

/**
 * Returns an equivalent angle within [0, 2π]
 * @param {number} θ
 */
export const equivAngle = θ => {
  if (0 <= θ && θ <= 2 * Math.PI) {
    return θ
  } else if (θ > 2 * Math.PI) {
    return θ % (2 * Math.PI)
  } else if (θ < 0) {
    return 2 * Math.PI - (-θ % (2 * Math.PI))
  }
}

/**
 * Maps a value that belongs in a specific range into a new target range
 * @param {number} v value to be mapped,
 * @param {number} vmin -> minimum of value range
 * @param {number} vmax -> maximum of value range
 * @param {number} mvMin -> minimum of target range
 * @param {number} mvMax -> maximum of target range
 *
 * @example
 *
 * ```js
 * let dist = 30; // within range: [0, 100]
 * dist = map(30, 0 , 100, 0, 200); // will return 60 within new range: [0, 200]
 * ```
 */
export const map = (v, vmin, vmax, mvMin, mvMax) => {
  const a = (mvMax - mvMin) / (vmax - vmin)
  const b = v - vmin
  return a * b + mvMin
}

/**
 * Truncates a number up to the digits you specify
 * @param {number} n -> the number to be truncated
 * @param {number} digits -> how many decimal places you want to keep
 * default: 3 decimal places (will keep 3 digits)
 */
export const decimalTrunc = (n = 1.23456789, digits = 3) => {
  n *= Math.pow(10, digits)
  n = Math.trunc(n)
  n /= Math.pow(10, digits)
  return n
}

/**
 * Starts or pauses animation frame
 * @param {boolean} paused -> animation state
 * @param {number} fid -> The ID value returned by the call to window.requestAnimationFrame() that requested the callback.
 * @param {function} -> name of animating function
 */
export const sp = (paused, fid, animate) => {
  paused ? cancelAnimationFrame(fid) : requestAnimationFrame(animate)
  paused = !paused
  return paused
}

/**
 * Sets canvas size as well as pixel density
 * @param {HTMLCanvasElement} c -> canvas
 * @param {CanvasRenderingContext2D} ctx -> canvas context
 * @param {number} w -> canvas width
 * @param {number} h -> canvas height
 * @param {number} pd -> device pixel ratio
 */
export const setSize = (
  c = HTMLCanvasElement,
  ctx = CanvasRenderingContext2D,
  w = window.innerWidth,
  h = window.innerHeight,
  pd
) => {
  //canvas apparent size
  c.style.width = `${w}px`
  c.style.height = `${h}px`

  //canvas actual size
  c.width = w * pd
  c.height = h * pd

  //normalise coordinates
  ctx.scale(pd, pd)
  return c
}

/**
 * Clears whole canvas disregarding the state of transformation matrix
 * @param {HTMLCanvasElement} c -> canvas
 * @param {CanvasRenderingContext2D} ctx -> canvas context
 * @param {string} color -> color format string
 * @example: 'rgba(0, 0, 0, 0.5)'
 */
export const clear = (c = HTMLCanvasElement, ctx = CanvasRenderingContext2D, color = 'rgba(0, 0, 0, 1)') => {
  //get previous canvas transformation matrix
  const previousTransform = ctx.getTransform()
  //reset canvas transform state
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  if (color == null) {
    ctx.clearRect(0, 0, c.width, c.height)
  } else {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, c.width, c.height)
  }
  //reset canvas transform state
  ctx.setTransform(previousTransform)
}
