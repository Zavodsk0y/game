let left = 0
let topCoords = 0
let jumpCount = 1
let jumpLength = 50
let jumpHeight = 4 * jumpLength * Math.sin(Math.PI * jumpCount / jumpLength)
console.log(jumpHeight)
let x = 20, y = 100
let isJumping = false


function jump() {
    let jumpHeight = 500;
    let jumpDuration = 2000;

    const startTime = Date.now();

    function jumpStep() {
        const remainingTime = Date.now() - startTime;
        const progress = Math.min(remainingTime / jumpDuration, 1);
        const jumpValue = Math.sin(progress * Math.PI) * jumpHeight;

        character.style.bottom = jumpValue + 'px';


        if (progress < 1 && !isPaused) {
            requestAnimationFrame(jumpStep);
        } else {
            isJumping = false;
            character.style.bottom = 0;

        }
    }

    requestAnimationFrame(jumpStep);
}

window.onkeydown = function move(ev) {
    if (ev.key === 'ArrowLeft' && !isPaused && !gameOverFlag) {
        if (character.classList.contains('hidden')) return;
        left = left - 25;
        character.classList.add('mirrored');
        character.style.left = left + 'px';
        if (gameOverFlag) left = 0;
    } else if (ev.key === 'ArrowRight' && !isPaused && !gameOverFlag) {
        if (character.classList.contains('hidden')) return;
        left = left + 25;
        character.classList.remove('mirrored');
        character.style.left = left + 'px';
    } else if (ev.key === 'ArrowUp' && !isJumping && !isPaused && !gameOverFlag) {
        isJumping = true;
        jump();
        character.classList.remove('hidden');
    } else if (ev.key === 'ArrowDown' && !isPaused && !gameOverFlag) {
        character.classList.add('hidden');
    }

    checkCollisions();
}


const obstacle = document.getElementById('pillar')


function checkCollisions() {
    if (isCollision(character, obstacle)) {
        const obstacleArea = obstacle.getBoundingClientRect();
        const characterArea = character.getBoundingClientRect();

        if (characterArea.bottom > obstacleArea.top && characterArea.top < obstacleArea.top) {
            character.style.top = (obstacleArea.top - character.clientHeight) + 'px';
        } else if (characterArea.top < obstacleArea.bottom && characterArea.bottom > obstacleArea.bottom) {
            character.style.top = (obstacleArea.bottom) + 'px';
        } else if (characterArea.right > obstacleArea.left && characterArea.left < obstacleArea.left) {
            character.style.left = (obstacleArea.left - character.clientWidth) + 'px';
        } else if (characterArea.left < obstacleArea.right && characterArea.right > obstacleArea.right) {
            character.style.left = (obstacleArea.right) + 'px';
        }
    }
}

function isCollision(firstEl, secondEl) {
    let chara = firstEl.getBoundingClientRect()
    const pillar = secondEl.getBoundingClientRect()

    return !(chara.right < pillar.left ||
        chara.left > pillar.right ||
        chara.bottom < pillar.top ||
        chara.top > pillar.bottom)
}

// if (isCollision(character, obstacle)) {
//     const obstacleArea = obstacle.getBoundingClientRect();
//     const characterArea = character.getBoundingClientRect();
//
//     if (characterArea.bottom > obstacleArea.top && characterArea.top < obstacleArea.top) {
//         character.style.top = (obstacleArea.top - character.clientHeight) + 'px';
//     }
//     else if (characterArea.top < obstacleArea.bottom && characterArea.bottom > obstacleArea.bottom) {
//         character.style.top = (obstacleArea.bottom) + 'px';
//     }
//     else if (characterArea.right > obstacleArea.left && characterArea.left < obstacleArea.left) {
//         character.style.left = (obstacleArea.left - character.clientWidth) + 'px';
//     }
//     else if (characterArea.left < obstacleArea.right && characterArea.right > obstacleArea.right) {
//         character.style.left = (obstacleArea.right) + 'px';
//     }
// }




