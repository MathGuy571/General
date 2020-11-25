import { equivAngle } from './Utilities.js'

/**
 * Creates a line between 2 points: (x1, y1), (x2, y2)
 * @param {object} ctx -> canvas context
 * @param {number} x1 -> point1 x coordinate
 * @param {number} y1 -> point1 y coordinate
 * @param {number} x2 -> point2 x coordinate
 * @param {number} y2 -> point2 y coordinate
 */
export const line = (ctx, x1, y1, x2, y2) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}

/**
 *
 * @param {object} ctx -> canvas context
 * @param {object} c -> circle object
 * @example:
 * circle(ctx, {
 *       pos         : [0, 0] <positon of circle>
 *       r           : 300 <radius>
 *       θ1          : 0 <start angle>                      // default = 0
 *       θ2          : 3 * Math.PI / 2 <end angle>          // default = 2 * Math.PI
 *       stroke      : true <stroke or fill>             // default = true
 *       moveToCenter: false <whether add a ctx.moveTo function>  // default = false, true will draw a circular sector
 *   })
 */
export const circle = (ctx, c) => {
  ctx.beginPath()
  if (c.moveToCenter) {
    ctx.moveTo(c.pos[0], c.pos[1])
    //convert the angles to their equivalents within [0, 2π]
    c.θ1 = equivAngle(c.θ1)
    c.θ2 = equivAngle(c.θ2)
    //swap them if necessary
    if (c.θ1 > c.θ2) {
      const temp = c.θ1
      c.θ1 = c.θ2
      c.θ2 = temp
    }
  }

  ctx.arc(c.pos[0], c.pos[1], c.r, c.θ1 || 0, isNaN(c.θ2) ? 2 * Math.PI : c.θ2)
  ctx.closePath()
  c.stroke == undefined || c.stroke ? ctx.stroke() : ctx.fill()
}

/**
 * Creates a triangle from 3 points: (x1, y1), (x2, y2), (x3, y3)
 * @param {object} ctx -> canvas context
 * @param {Array} p1 -> coordinates of point 1
 * @param {Array} p2 -> coordinates of point 2
 * @param {Array} p3 -> coordinates of point 3
 * @param {boolean} stroke -> boolean stroke or fill
 */
export const triangle = (ctx, p1, p2, p3, stroke = true) => {
  ctx.beginPath()
  ctx.moveTo(p1[0], p1[1])
  ctx.lineTo(p2[0], p2[1])
  ctx.lineTo(p3[0], p3[1])
  ctx.closePath()
  stroke ? ctx.stroke() : ctx.fill()
}

/**
 *
 * @param {object} ctx -> canvas context
 * @param {object} c -> ellipse object
 * @example:
 * ellipse({
 *     pos    : [0, 0] <position of ellipse>
 *     rx     : 30 <x radius>
 *     ry     : 60 <y radius>
 *     rot    : PI/4 <rotation> // default = 0
 *     θ1     : 0 <start angle> // default = 0
 *     θ2     : PI <end angle> // default = 2 * Math.PI
 *     stroke : false <stroke or fill> // default = true
 *   })
 */
export const ellipse = (ctx, c) => {
  ctx.beginPath()
  ctx.ellipse(c.pos[0], c.pos[1], c.rx, c.ry, c.rot || 0, c.θ1 || 0, isNaN(c.θ2) ? 2 * Math.PI : c.θ2)
  ctx.closePath()
  c.stroke == undefined || c.stroke ? ctx.stroke() : ctx.fill()
}

/**
 * Draws text on canvas
 * @param {object} ctx -> canvas context
 * @param {object} c -> text object
 * @example:
 * text({
 *      text: <your text>,
 *      pos: <text position>,
 *      size: <font-size>, //default : 20
 *      angle: <rotation of text> // default: 0
 *      font: <font-family>, // default: serif
 *      color: <text-color>, // default: #000
 *   })
 */
export const text = (ctx, c) => {
  const size = isNaN(c.size) ? 20 : c.size
  const font = c.font == undefined ? 'serif' : c.font

  const s = size + 'px'
  const f = ' ' + font
  ctx.font = s + f
  ctx.fillStyle = c.color == undefined ? '#000' : c.color

  ctx.save()
  ctx.translate(c.pos[0], c.pos[1])
  ctx.rotate(isNaN(c.angle) ? 0 : c.angle)
  ctx.fillText(c.text, 0, 0)
  ctx.restore()
}

/**
 *
 * @param {object} ctx -> canvas context
 * @param {number} size
 * @param {number} cellSize
 * @param {string} color -> color format string
 */
export const grid = (ctx, size, cellSize, color) => {
  ctx.strokeStyle = color
  for (let i = 0; i <= size; i += cellSize) {
    //vertical lines
    line(ctx, i, 0, i, size)
    //horizontal lines
    line(ctx, 0, i, size, i)
  }
}

/**
 *Draws axes disregarding the state of transformation matrix
 * @param {object} c -> canvas object
 * @param {object} ctx -> canvas context
 * @param {string} color -> color format string
 * @param {number} pd -> device pixel ratio
 * @param {number} width -> line width
 */
export const drawAxes = (c, ctx, color, pd, width) => {
  //get previous canvas transformation matrix
  const previousTransform = ctx.getTransform()
  //reset canvas transform state
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  //set appropriate line width
  ctx.lineWidth = isNaN(width) ? pd : width
  ctx.strokeStyle = color
  //x-axis
  line(ctx, 0, c.height / 2, c.width, c.height / 2)
  //y-axis
  line(ctx, c.width / 2, 0, c.width / 2, c.height)
  //set canvas transform state back to previous state
  ctx.setTransform(previousTransform)
  //reset line width
  ctx.lineWidth = 1
}
