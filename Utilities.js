const random = (max=1, min=0) => Math.random()*(max-min) + min;

const calcFPS = () => {
    let timeDiff = Date.now() - lastTimeCalled;
    lastTimeCalled = Date.now();
    fps.innerText = `fps: ${Math.round(1000/timeDiff)}`;
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

const circle = (x, y, r, θ1=0, θ2=2*Math.PI, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.arc(x, y, r, θ1, θ2);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width;
    stroke? ctx.stroke() : ctx.fill();
    ctx.closePath();
};

const triangle = (x1, y1, x2, y2, x3, y3, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.closePath();
    fill? ctx.fill() : ctx.stroke();
};

const ellipse = (x, y, rx, ry, rot, θ1=0, θ2=2*Math.PI, width=1, stroke=true, color="rgb(0, 0, 0)") => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, θ1, θ2);
    ctx.strokeStyle = ctx.fillStyle = color;
    ctx.lineWidth = width;
    stroke? ctx.stroke() : ctx.fill();
    ctx.closePath;
};

const text = (msg, x, y, angle, size, font, color="black") => {
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

const clear = (tw=0, th=0) => ctx.clearRect(tw, th, W, H);

const fillClear = (tw=0, th=0, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(tw, th, W, H);
};
