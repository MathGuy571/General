/*
*  Returns a random number within a specified range
*  parameters:
*  min -> the minimum value, default = 0,
*  max -> the maximum value, default = 1
*  e.g. let rand = random(-10, 10); will return a random number between -10 & 10
*/
const random = (min, max) => {
    if(min == undefined && max == undefined) {
        min = 0;
        max = 1;
    } else if(max == undefined) {
        max = 0;
        let temp = min;
        min = max;
        max = temp;
    }
    
    return Math.random() * (max - min) + min;
};

/* 
*  Creates and ads an fps div
*  parameters: 
*  id -> id of fps div, type: string
*  top -> margin from top of the screen, type: string
*  left -> margin from left of the screen, type: string
*  color -> self explanatory, type: string
*  e.g. let fps = new FpsDiv("Fps", "15px", "20px", "#3f0");
*/
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
        this.div.innerText = `fps: ${Math.round(1000 / dt)}`;
    }
};

/*
*  Returns an equivalent angle within [0, 2π]
*  parameter: 
*  θ ->  angle value, type: number
*/
const equivAngle = (θ) => {
    if (0 <= θ && θ <= (2 * Math.PI)) {
        return θ;
    }
    else if(θ > (2 * Math.PI)) {
        return θ % (2 * Math.PI);
    } else if(θ < 0) {
        return 2 * Math.PI - ((-θ) % (2 * Math.PI));
    }
};
  
/*
*  Maps a value that belongs in a specific range to a target value within a target range
*  parameters:
*  v -> value to be mapped,
*  vmin -> minimum of value range,
*  vmax -> maximum of value range,
*  vmin -> minimum of target range,
*  vmax -> maximum of target range
*  e.g. let dist = 30; // with maximum value of 100
*  dist = map(30, 0 , 100, 0, 200); //will return 60
*/
const map = (v, vmin, vmax, mvMin, mvMax) => {
    let a = (mvMax - mvMin) / (vmax - vmin);
    let b = v - vmin;
    return a * b + mvMin;
};

/*
* Truncates a number up to the digits you specify
* parameters: 
* n -> the number to be truncated,
* digits -> how many decimal places you want to keep //default: 3 decimal places(will keep 3 digits)
*/
const decimalTrunc = (n, digits=3) => {
    n *= Math.pow(10, digits);
    n = Math.trunc(n);
    n /= Math.pow(10, digits);
    return n;
};

/*
*  Starts or pauses animation frame
*/
const sp = () => {
    if(!paused) {
        window.cancelAnimationFrame(fc);
        paused = true;
    } else {
        window.requestAnimationFrame(animate);
        paused = false;
    }
};

/*
*  Sets canvas size as well as pixel density
*  parameters:
*  w -> canvas width, type: number
*  h -> canvas height, type: number
*  p -> canvas pixel density, type: number
*  e.g if pd = 3 you'll have 3 pixels in place of one
*/
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

/*
*  Clears whole canvas disregarding the state of transformation matrix
*  parameter:
*  color -> color, type: string 
*  e.g. 'rgba(0, 0, 0, 0.5)'
*/
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
