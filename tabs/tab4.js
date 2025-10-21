function startCSSAnimation() {
    document.getElementById('css-ball').classList.add('animating');
}

function stopCSSAnimation() {
    const ball = document.getElementById('css-ball');
    ball.classList.remove('animating');
    ball.style.left = '0';
}
