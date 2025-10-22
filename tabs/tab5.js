// This file will be loaded separately and contains the initialization logic

let canvasAnimationId = null;
let canvasStartTime = null;
const CANVAS_ANIMATION_DURATION = 1300;

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeIn(t) {
    return t * t * t;
}

function getBallTransform(progress) {
    let translateY, scaleX, scaleY;

    if (progress < 0.1) {
        const t = progress / 0.1;
        const eased = easeOut(t);
        translateY = -20 * eased;
        scaleX = 1.2 - 0.2 * eased;
        scaleY = 0.8 + 0.2 * eased;
    } else if (progress < 0.5) {
        const t = (progress - 0.1) / 0.4;
        const eased = easeIn(t);
        translateY = -20 - 180 * eased;
        scaleX = 1 - 0.1 * eased;
        scaleY = 1 + 0.1 * eased;
    } else if (progress < 0.6) {
        const t = (progress - 0.5) / 0.1;
        const eased = easeOut(t);
        translateY = -200 + 20 * eased;
        scaleX = 0.9 + 0.1 * eased;
        scaleY = 1.1 - 0.1 * eased;
    } else if (progress < 0.85) {
        const t = (progress - 0.6) / 0.25;
        const eased = easeIn(t);
        translateY = -180 + 160 * eased;
        scaleX = 1;
        scaleY = 1;
    } else {
        const t = (progress - 0.85) / 0.15;
        const eased = easeOut(t);
        translateY = -20 + 30 * eased;
        scaleX = 1 + 0.2 * eased;
        scaleY = 1 - 0.2 * eased;
    }

    return { translateY, scaleX, scaleY };
}

function getShadowTransform(progress) {
    let scale, opacity;

    if (progress < 0.1) {
        const t = progress / 0.1;
        scale = 1 - 0.1 * t;
        opacity = 0.6 - 0.1 * t;
    } else if (progress < 0.5) {
        const t = (progress - 0.1) / 0.4;
        scale = 0.9 - 0.5 * t;
        opacity = 0.5 - 0.3 * t;
    } else if (progress < 0.6) {
        const t = (progress - 0.5) / 0.1;
        scale = 0.4 + 0.1 * t;
        opacity = 0.2 + 0.05 * t;
    } else if (progress < 0.85) {
        const t = (progress - 0.6) / 0.25;
        scale = 0.5 + 0.4 * t;
        opacity = 0.25 + 0.25 * t;
    } else {
        const t = (progress - 0.85) / 0.15;
        scale = 0.9 + 0.1 * t;
        opacity = 0.5 + 0.1 * t;
    }

    return { scale, opacity };
}

function drawBall(ctx, x, y, scaleX, scaleY, radius) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);

    const gradient = ctx.createRadialGradient(-radius * 0.6, -radius * 0.6, 0, 0, 0, radius);
    gradient.addColorStop(0, '#e8cbe0');
    gradient.addColorStop(0.7, '#a86487');
    gradient.addColorStop(1, '#977173');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
}

function drawShadow(ctx, x, y, scale, opacity, width, height) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width / 2);
    gradient.addColorStop(0, 'rgba(151, 113, 115, 0.6)');
    gradient.addColorStop(1, 'rgba(151, 113, 115, 0)');

    ctx.beginPath();
    ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
}

function drawInitialState() {
    const canvas = document.getElementById('ballCanvas');

    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ballRadius = 50;
    const ballX = canvasWidth / 2;
    const ballY = canvasHeight - 70;
    const shadowX = canvasWidth / 2;
    const shadowY = canvasHeight - 20;

    drawShadow(ctx, shadowX, shadowY, 1, 1, 100, 20);
    drawBall(ctx, ballX, ballY, 1, 1, ballRadius);
}

function animateCanvas(timestamp) {
    const canvas = document.getElementById('ballCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvasStartTime) canvasStartTime = timestamp;
    const elapsed = timestamp - canvasStartTime;
    const progress = (elapsed % CANVAS_ANIMATION_DURATION) / CANVAS_ANIMATION_DURATION;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const ballTransform = getBallTransform(progress);
    const shadowTransform = getShadowTransform(progress);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ballRadius = 50;
    const ballX = canvasWidth / 2;
    const ballY = canvasHeight - 70;
    const shadowWidth = 100;
    const shadowHeight = 20;

    const shadowX = canvasWidth / 2;
    const shadowY = canvasHeight - 20;

    drawShadow(ctx, shadowX, shadowY, shadowTransform.scale, shadowTransform.opacity, shadowWidth, shadowHeight);
    drawBall(ctx, ballX, ballY + ballTransform.translateY, ballTransform.scaleX, ballTransform.scaleY, ballRadius);

    canvasAnimationId = requestAnimationFrame(animateCanvas);
}

window.startCanvasAnimation = function () {
    if (canvasAnimationId) return;
    canvasStartTime = null;
    canvasAnimationId = requestAnimationFrame(animateCanvas);
};

window.stopCanvasAnimation = function () {
    if (canvasAnimationId) {
        cancelAnimationFrame(canvasAnimationId);
        canvasAnimationId = null;
        canvasStartTime = null;
        drawInitialState();
    }
};

function initializeCanvasTab() {
    setTimeout(() => {
        drawInitialState();
    }, 50);
}

if (document.getElementById('ballCanvas')) {
    initializeCanvasTab();
}
