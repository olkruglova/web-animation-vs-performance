function startCSSAnimation() {
    document.getElementById('ball').classList.add('animating');
    document.getElementById('ball-shadow').classList.add('animating');
}

function stopCSSAnimation() {
    document.getElementById('ball').classList.remove('animating');
    document.getElementById('ball-shadow').classList.remove('animating');
}
