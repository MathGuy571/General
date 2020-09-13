const random = (max=1, min=0) => Math.random()*(max-min) + min;

class FpsDiv {
    constructor(id, top, left, color) {
        this.div = document.createElement("div"); 
        //set id 
        this.div.id = id; 
        //set style 
        this.div.style.position = "absolute"; 
        this.div.style.top = top; 
        this.div.style.left = left; 
        this.div.style.color = color; 
        //set creation timestamp 
        this.time = performance.now(); 
        //append fps div to body 
        let body = document.getElementsByTagName("BODY")[0]; 
        body.appendChild(this.div);
    }
    
    calc() { 
        let dt = performance.now() - this.time; 
        this.time = performance.now(); 
        this.div.innerText = `fps: ${Math.round(1000/dt)}`;
    }
};

const line = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
};

/**
 * draws a circle or a circular sector
 *
 * Usage:
 *  circle({
 *      pos         : <positon of circle>
 *      r           : <radius>
 *      θ1          : <start angle>                        // default = 0
 *      θ2          : <end angle>                          // default = 2*Math.PI
 *      stroke      : <whether to stroke>                  // default = true
 *      moveToCenter: <whether add a ctx.moveTo function>  // default = false, true will draw a circular sector
 *  });
 */

const circle = (c) => { 
    ctx.beginPath(); 
    if (c.moveToCenter) {
        ctx.moveTo(c.pos[0], c.pos[1]);
        //convert the angles to their equivalents within [0, 2π] 
        c.θ1 = equivAngle(c.θ1); 
        c.θ2 = equivAngle(c.θ2); 
        //swap them if necessary 
        if(c.θ1 > c.θ2) { 
            let temp = c.θ1; 
            c.θ1 = c.θ2; 
            c.θ2 = temp; 
        } 
    }
    
    ctx.arc( 
        c.pos[0], c.pos[1], 
        c.r, 
        c.θ1 || 0, 
        isNaN(c.θ2) ? Math.PI * 2: c.θ2
    ); 
    ctx.closePath(); 
    c.stroke == undefined || c.stroke? ctx.stroke() : ctx.fill();
};

// returns an equivalent angle within [0, 2π]

const equivAngle = (θ) => {
    if (0 <= θ && θ <= (2*Math.PI)) {
        return θ;
    }
    else if(θ > (2*Math.PI)) {
        return θ % (2*Math.PI);
    } else if(θ < 0) {
        return 2*Math.PI - ((-θ) % (2*Math.PI));
    }
};

/**
 *
 *
 * @param {Array} p1 <position of 1ˢᵗ point>
 * @param {Array} p2 <position of 2ⁿᵈ point>
 * @param {Array} p3 <position of 3ʳᵈ point>
 * @param {boolean} [stroke=true] whether to stroke
 */

const triangle = (p1, p2, p3, stroke=true) => {
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.lineTo(p3[0], p3[1]);
    ctx.closePath();
    stroke? ctx.stroke() : ctx.fill();
};

/**
 * draws an ellipse
 * Usage:
 *  ellipse({
 *    pos    : <position of ellipse>
 *    rx     : <x radius>
 *    ry     : <y radius>
 *    rot    : <rotation> // default = 0
 *    θ1     : <start angle> // default = 0
 *    θ2     : <end angle> // default = 2*Math.PI
 *    stroke : <whether to stroke> // default = true
 * });
 */

const ellipse = (c) => {
    ctx.beginPath();
    ctx.ellipse(
        c.pos[0], c.pos[1],
        c.rx, c.ry,
        c.rot || 0,
        c.θ1 || 0,
        isNaN(c.θ2) ? Math.PI * 2: c.θ2);
    ctx.closePath();
    c.stroke == undefined || c.stroke? ctx.stroke() : ctx.fill();
};

/**
 * Draws text on canvas
 * Using:
 *  text({
 *      text: <your text>,
 *      x: <x_location>,
 *      y: <y_location>,
 *      size: <font-size>, //default : 20
 *      font: <font-family>, // default: serif
 *      color: <text-color>, // default: #000
 *      angle: <rotation of text> // default: 0
 *  });
 * @param {Object} c 
 */

const text = (c) => {
    var size = isNaN(c.size)? 20: c.size;
    var font = c.font == undefined? "serif": c.font;

    let s = size+"px";
    let f = " "+font;
    ctx.font = s + f;
    ctx.fillStyle = c.color == undefined? "#000": c.color;;

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(isNaN(c.angle) ? 0: c.angle);
    ctx.fillText(c.text, 0, 0);
    ctx.restore();
};

const grid = (size, cellSize, color) => {
    ctx.strokeStyle = color;
    for(let i = 0; i <= size; i += cellSize) {
        //vertical lines
        line(i, 0, i, size);
        //horizontal lines
        line(0, i, size, i);
    }
};

const drawAxes = (color, pd) => {
    //get previous canvas transformation matrix
    let previousTransform = ctx.getTransform(); 
    //reset canvas transform state
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = pd;
    ctx.strokeStyle = color;
    //x-axis
    line(0, c.height/2, c.width, c.height/2);
    //y-axis
    line(c.width/2, 0, c.width/2, c.height);
    //set canvas transform state back to previous state
    ctx.setTransform(previousTransform);
};

const map = (v, vmin, vmax, mvMin, mvMax) => {
    let a = (mvMax - mvMin) / (vmax - vmin);
    let b = v - vmin;
    return a * b + mvMin;
};

const sp = () => {
    if(!paused) {
        window.cancelAnimationFrame(fc);
        paused = true;
    } else {
        window.requestAnimationFrame(animate);
        paused = false;
    }
};

const setSize = (w, h, pd) => {
    //canvas apparent size
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    
    //canvas actual size
    c.width = w * pd;
    c.height = h * pd;
    
    //set global Width & Height as apparent width & height
    W = w, H = h;
    
    //normalise coordinates
    ctx.scale(pd, pd);
};

const clear = (color) => {
    //get previous canvas transformation matrix
    let previousTransform = ctx.getTransform();
    //reset canvas transform state
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (color == null) {
        ctx.clearRect(0, 0, c.width, c.height);
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, c.width, c.height);
    }
    //reset canvas transform state
    ctx.setTransform(previousTransform);
};
