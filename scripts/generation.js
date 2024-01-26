let max = 100

function generateHyenas() {
    let hyena = document.createElement('div')
    hyena.className = 'hyena'
    let maxWidth = window.innerWidth - hyena.clientWidth

    hyena.style.left = getRandomPosition(maxWidth) + 'px'
    hyena.style.bottom = 0

    if (!isPaused && !gameOverFlag) {
        body.appendChild(hyena)
        hyenaMove()
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
    let hyenas = document.querySelectorAll('.hyena')
    for (let hyena of hyenas) {
        hyena.style.left = parseInt(hyena.style.left || 0) + 20 + 'px'
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