const random = (max=1, min=0) => Math.random()*(max-min) + min;

const calcFPS = () => {
    let timeDiff = Date.now() - lastTimeCalled;
    lastTimeCalled = Date.now();
    fps.innerText = `fps: ${round(1000/timeDiff)}`;
};

const line = (x1, y1, x2, y2, color, width=1) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
};

const circle = (x, y, r, θ1=0, θ2=2*Math.PI, color, stroke=true, width=1) => {
    ctx.beginPath();
    ctx.arc(x, y, r, θ1, θ2);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    stroke? ctx.stroke() : ctx.fill();
    ctx.closePath();
};

const ellipse = (x, y, rx, ry, rot, θ1=0, θ2=2*Math.PI, color, stroke=true, width=1) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, θ1, θ2);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    stroke? ctx.stroke() : ctx.fill();
    ctx.closePath;
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

const fillClear = (color) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
};
