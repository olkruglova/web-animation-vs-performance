function startCSSAnimation() {
    document.getElementById('css-ball').classList.add('animating');

    console.log("document.getElementById('css-shadow')", document.getElementById('css-shadow'));
    document.getElementById('css-shadow').classList.add('animating');
}

function stopCSSAnimation() {
    document.getElementById('css-ball').classList.remove('animating');
    document.getElementById('css-shadow').classList.remove('animating');
}
