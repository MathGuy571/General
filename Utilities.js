const random = (max=1, min=0) => Math.random()*(max-min) + min;

const calcFPS = () => {
    let timeDiff = Date.now() - lastTimeCalled;
    lastTimeCalled = Date.now();
    fps.innerText = `fps: ${Math.round(1000/timeDiff)}`;
};

const line = (x1, y1, x2, y2, width=1, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
};

const circle = (x, y, r, θ1=0, θ2=2*Math.PI, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.arc(x, y, r, θ1, θ2);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width;
    stroke? ctx.stroke() : ctx.fill();
    ctx.closePath();
};

const circularSector = (x, y, r, θ1, θ2, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    //convert the angles to their equivalents within [0, 2π]
    θ1 = equivAngle(θ1);
    θ2 = equivAngle(θ2);
    
    //swap them if necessary
    if(θ1>θ2) {
        let temp = θ1;
        θ1 = θ2
        θ2 = temp;  
    }
    
    ctx.lineWidth = width;
    ctx.strokeStyle = ctx.fillStyle = color;
    
    if(θ2 - θ1 <= Math.PI) {
        if(stroke) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + r*Math.cos(θ1), y + r*Math.sin(θ1));
            ctx.arc(x, y, r, θ1, θ2);
            ctx.lineTo(x + r*Math.cos(θ2), y + r*Math.sin(θ2));
            ctx.closePath();
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + r*Math.cos(θ1), y + r*Math.sin(θ1));
            ctx.arc(x, y, r, θ1, θ2);
            ctx.lineTo(x + r*Math.cos(θ2), y + r*Math.sin(θ2));
            ctx.closePath();
            ctx.fill(); 
        }
    } else {
        if(stroke) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + r*Math.cos(θ1), y + r*Math.sin(θ1));
            ctx.arc(x, y, r, θ1, θ2);
            ctx.lineTo(x + r*Math.cos(θ2), y + r*Math.sin(θ2));
            ctx.closePath();
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + r*Math.cos(θ1 + Math.PI), y + r*Math.sin(θ1 + Math.PI));
            ctx.arc(x, y, r, θ1, θ1 + Math.PI);
            ctx.arc(x, y, r, θ1 + Math.PI, θ2);
            ctx.lineTo(x + r*Math.cos(θ2),  y + r*Math.sin(θ2));
            ctx.closePath();
            ctx.fill();
        }
    }
};

const equivAngle = (θ) => {
    if(0 <= θ && θ <= (2*Math.PI)) {
        return θ;
    }
    else if(θ > (2*Math.PI)) {
        return θ % (2*Math.PI);
    } else if(θ < 0) {
        return 2*Math.PI - ((-θ) % (2*Math.PI));
    }
};

const triangle = (x1, y1, x2, y2, x3, y3, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.closePath();
    stroke? ctx.stroke() : ctx.fill();
};

const ellipse = (x, y, rx, ry, rot, θ1=0, θ2=2*Math.PI, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, θ1, θ2);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width;
    stroke? ctx.stroke() : ctx.fill();
    ctx.closePath;
};

const text = (msg, x, y, angle, size, font, color="rgb(0, 0, 0)") => {
    let s = size+"px";
    let f = " "+font;
    ctx.font = s + f;
    ctx.fillStyle = color;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(msg, 0, 0);
    ctx.restore();
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
    c.width = W = w * pd;
    c.height = H = h * pd;
};

const clear = () => ctx.clearRect(0, 0, W, H);

const fillClear = (color="rgb(255, 255, 255)") => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
};
