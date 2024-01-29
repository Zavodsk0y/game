let max = 100
let hyenasData = []


function generateHyenas() {
    let hyena = document.createElement('div');
    hyena.className = 'hyena';
    let maxWidth = window.innerWidth - hyena.clientWidth;

    hyena.style.left = getRandomPosition(maxWidth) + 'px';
    hyena.style.bottom = 0;

    if (!isPaused && !gameOverFlag) {
        body.appendChild(hyena);
        hyenasData.push({ element: hyena, direction: 1, distance: 0 });
        hyenaMove();
    }
}

function deleteHyenas() {
    let hyenas = document.querySelectorAll('.hyena')
    hyenas.forEach(e => e.remove());

}

function getRandomPosition(arg) {
    return Math.random() * arg
}

let hyenaInterval;

function hyenaMove() {
    for (let hyenaData of hyenasData) {
        const hyena = hyenaData.element;
        const maxWidth = window.innerWidth - hyena.clientWidth;

        if (hyenaData.distance >= 500 || hyena.offsetLeft <= 0 || hyena.offsetLeft >= maxWidth) {
            hyenaData.direction *= -1;
            hyenaData.distance = 0;
        }

        const newPosition = hyena.offsetLeft + 2 * hyenaData.direction;
        hyena.style.left = Math.min(Math.max(newPosition, 0), maxWidth) + 'px';

        hyenaData.distance += 2;
    }

    if (!isPaused && !gameOverFlag) {
        requestAnimationFrame(hyenaMove);
    }
}

// function moveHyenas() {
//     let hyenas = document.querySelectorAll('.hyena')
//     for (let hyena of hyenas) {
//
//     }
// }


// hyenaInterval =
//     setInterval(() => {
//         hyena.style.left = parseInt(hyena.style.left || 0) + 20 + 'px'
//     }, 200)