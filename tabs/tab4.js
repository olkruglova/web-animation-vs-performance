let transitionTimeouts = [];
let isAnimating = false;

const keyframes = [
    {
        ball: { translateY: 0, scaleX: 1, scaleY: 1 },
        shadow: { scale: 1, opacity: 0.6 },
        duration: 0,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    {
        ball: { translateY: -20, scaleX: 1, scaleY: 1 },
        shadow: { scale: 0.9, opacity: 0.5 },
        duration: 130,
        easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    },
    {
        ball: { translateY: -200, scaleX: 0.9, scaleY: 1.1 },
        shadow: { scale: 0.4, opacity: 0.2 },
        duration: 520,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    {
        ball: { translateY: -180, scaleX: 1, scaleY: 1 },
        shadow: { scale: 0.5, opacity: 0.25 },
        duration: 130,
        easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    },
    {
        ball: { translateY: -20, scaleX: 1, scaleY: 1 },
        shadow: { scale: 0.9, opacity: 0.5 },
        duration: 325,
        easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    },
    {
        ball: { translateY: 10, scaleX: 1.2, scaleY: 0.8 },
        shadow: { scale: 1, opacity: 0.6 },
        duration: 195,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
];

function applyTransition(element, properties, duration, easing) {
    if (duration === 0) {
        element.style.transition = 'none';
    } else {
        element.style.transition = `all ${duration}ms ${easing}`;
    }

    Object.keys(properties).forEach((prop) => {
        element.style[prop] = properties[prop];
    });
}

function animateKeyframe(index) {
    if (!isAnimating) return;

    const ball = document.getElementById('ball');
    const shadow = document.getElementById('ball-shadow');
    const keyframe = keyframes[index];

    const ballTransform = `translateY(${keyframe.ball.translateY}px) scaleX(${keyframe.ball.scaleX}) scaleY(${keyframe.ball.scaleY})`;
    applyTransition(ball, { transform: ballTransform }, keyframe.duration, keyframe.easing);

    const shadowTransform = `scale(${keyframe.shadow.scale}, ${keyframe.shadow.scale})`;
    applyTransition(
        shadow,
        {
            transform: shadowTransform,
            opacity: keyframe.shadow.opacity,
        },
        keyframe.duration,
        keyframe.easing
    );

    const nextIndex = (index + 1) % keyframes.length;

    console.log('nextIndex', nextIndex);
    const timeout = setTimeout(() => animateKeyframe(nextIndex), keyframe.duration);
    transitionTimeouts.push(timeout);
}

function startTransitionAnimation() {
    if (isAnimating) return;

    isAnimating = true;
    animateKeyframe(0);
}

function stopTransitionAnimation() {
    isAnimating = false;

    transitionTimeouts.forEach((timeout) => clearTimeout(timeout));
    transitionTimeouts = [];

    const ball = document.getElementById('ball');
    const shadow = document.getElementById('ball-shadow');

    ball.style.transition = 'none';
    shadow.style.transition = 'none';

    ball.style.transform = 'translateY(0) scaleX(1) scaleY(1)';
    shadow.style.transform = 'scale(1, 1)';
    shadow.style.opacity = '1';
}
