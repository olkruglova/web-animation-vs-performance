let ballAnimation = null;
let shadowAnimation = null;

function startWAAPIAnimation() {
    if (ballAnimation && ballAnimation.playState === 'running') return;

    const ball = document.getElementById('ball');
    const shadow = document.getElementById('ball-shadow');

    const ballKeyframes = [
        {
            transform: 'translateY(0px) scaleX(1) scaleY(1)',
            offset: 0,
            easing: 'ease-out',
        },
        {
            transform: 'translateY(-20px) scaleX(1) scaleY(1)',
            offset: 0.1,
            easing: 'ease-in',
        },
        {
            transform: 'translateY(-200px) scaleX(0.9) scaleY(1.1)',
            offset: 0.5,
            easing: 'ease-out',
        },
        {
            transform: 'translateY(-180px) scaleX(1) scaleY(1)',
            offset: 0.6,
            easing: 'ease-in',
        },
        {
            transform: 'translateY(-20px) scaleX(1) scaleY(1)',
            offset: 0.85,
            easing: 'ease-in',
        },
        {
            transform: 'translateY(10px) scaleX(1.2) scaleY(0.8)',
            offset: 1,
            easing: 'ease-out',
        },
    ];

    const shadowKeyframes = [
        {
            transform: 'scale(1, 1)',
            opacity: 0.6,
            offset: 0,
        },
        {
            transform: 'scale(0.9, 0.9)',
            opacity: 0.5,
            offset: 0.1,
        },
        {
            transform: 'scale(0.4, 0.4)',
            opacity: 0.2,
            offset: 0.5,
        },
        {
            transform: 'scale(0.5, 0.5)',
            opacity: 0.25,
            offset: 0.6,
        },
        {
            transform: 'scale(0.9, 0.9)',
            opacity: 0.5,
            offset: 0.85,
        },
        {
            transform: 'scale(1, 1)',
            opacity: 0.6,
            offset: 1,
        },
    ];

    const animationOptions = {
        duration: 1300,
        iterations: Infinity,
        easing: 'linear',
    };

    ballAnimation = ball.animate(ballKeyframes, animationOptions);
    shadowAnimation = shadow.animate(shadowKeyframes, animationOptions);
}

function stopWAAPIAnimation() {
    if (ballAnimation) {
        ballAnimation.cancel();
        ballAnimation = null;
    }

    if (shadowAnimation) {
        shadowAnimation.cancel();
        shadowAnimation = null;
    }

    const ball = document.getElementById('ball');
    const shadow = document.getElementById('ball-shadow');

    ball.style.transform = 'translateY(0) scaleX(1) scaleY(1)';
    shadow.style.transform = 'scale(1, 1)';
    shadow.style.opacity = '1';
}

function pauseWAAPIAnimation() {
    if (ballAnimation) ballAnimation.pause();
    if (shadowAnimation) shadowAnimation.pause();
}

function resumeWAAPIAnimation() {
    if (ballAnimation) ballAnimation.play();
    if (shadowAnimation) shadowAnimation.play();
}

function setAnimationSpeed(speed) {
    if (ballAnimation) ballAnimation.playbackRate = speed;
    if (shadowAnimation) shadowAnimation.playbackRate = speed;
}

function reverseWAAPIAnimation() {
    if (ballAnimation) ballAnimation.reverse();
    if (shadowAnimation) shadowAnimation.reverse();
}
