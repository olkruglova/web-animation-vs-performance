let rafAnimationId = null;
let rafStartTime = null;

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeIn(t) {
    return t * t * t;
}

function startRAFAnimation() {
    const ball = document.getElementById('ball');
    const container = ball.parentElement;
    const maxX = container.offsetWidth - 50;
    rafStartTime = null;

    function animate(timestamp) {
        if (!rafStartTime) rafStartTime = timestamp;
        const elapsed = timestamp - rafStartTime;
        const duration = 4000; // 4 seconds
        const progress = (elapsed % duration) / duration;

        // Horizontal movement (linear)
        const x = progress * maxX;

        // Vertical bouncing with decreasing height
        let y = 2; // ground level
        const bounces = [
            { start: 0, end: 0.25, height: 300 },
            { start: 0.25, end: 0.5, height: 200 },
            { start: 0.5, end: 0.75, height: 120 },
            { start: 0.75, end: 1, height: 50 },
        ];

        for (let bounce of bounces) {
            if (progress >= bounce.start && progress < bounce.end) {
                const bounceProgress = (progress - bounce.start) / (bounce.end - bounce.start);
                if (bounceProgress < 0.5) {
                    // Going up
                    y = 2 + easeOut(bounceProgress * 2) * bounce.height;
                } else {
                    // Coming down
                    y = 2 + easeIn(1 - (bounceProgress - 0.5) * 2) * bounce.height;
                }
                break;
            }
        }

        // Rotation
        const rotation = progress * 720;

        ball.style.left = x + 'px';
        ball.style.bottom = y + 'px';
        ball.style.transform = `rotate(${rotation}deg)`;

        rafAnimationId = requestAnimationFrame(animate);
    }

    rafAnimationId = requestAnimationFrame(animate);
}

function stopRAFAnimation() {
    if (rafAnimationId) {
        cancelAnimationFrame(rafAnimationId);
        rafAnimationId = null;
    }
    const ball = document.getElementById('ball');
    ball.style.left = '0';
    ball.style.bottom = '2px';
    ball.style.transform = 'rotate(0deg)';
}
