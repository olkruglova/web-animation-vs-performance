let animationId = null;
let startTime = null;
const ANIMATION_DURATION = 1300; // 1.3s in milliseconds

// Easing functions
function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeIn(t) {
    return t * t * t;
}

function cubicBezier(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getAnimationProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = (elapsed % ANIMATION_DURATION) / ANIMATION_DURATION;
    return progress;
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

function animate(timestamp) {
    const ball = document.getElementById('ball');
    const shadow = document.getElementById('ball-shadow');
    const progress = getAnimationProgress(timestamp);

    const ballTransform = getBallTransform(progress);
    ball.style.transform = `translateY(${ballTransform.translateY}px) scaleX(${ballTransform.scaleX}) scaleY(${ballTransform.scaleY})`;

    const shadowTransform = getShadowTransform(progress);
    shadow.style.transform = `scale(${shadowTransform.scale}, ${shadowTransform.scale})`;
    shadow.style.opacity = shadowTransform.opacity;

    animationId = requestAnimationFrame(animate);
}

function startRAFAnimation() {
    if (animationId) return;
    startTime = null;
    animationId = requestAnimationFrame(animate);
}

function stopRAFAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        startTime = null;

        const ball = document.getElementById('ball');
        const shadow = document.getElementById('ball-shadow');
        ball.style.transform = 'translateY(0) scaleX(1) scaleY(1)';
        shadow.style.transform = 'scale(1, 1)';
        shadow.style.opacity = '1';
    }
}
