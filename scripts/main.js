const video = document.querySelector('#video');
const welcomeSection = document.querySelector('.welcome')
const name = document.getElementById('name')
const game = document.querySelector('.game')
const pName = document.querySelector('.p-name')
const form = document.getElementById('form')
const timer = document.getElementById('timer')
const HP = document.querySelector('.hp')
const charImage = document.querySelector('.charImage')
const eatHp = 5
const hyenaDamage = 30
const character = document.getElementById('appearance')
const body = document.getElementById('body')
let startFlag = false
const pause = document.querySelector('.pause')
let isPaused = false
let gameOverFlag = false
const gameOverSection = document.querySelector('.gameover')
const newGameButton = document.querySelector('.newGame-btn')

let nams = ''

video.play()

const startBtn = document.getElementById('startGame')

form.addEventListener('submit', function (ev) {
    ev.preventDefault()
    const form = ev.target
    const formFields = form.elements
    nams = formFields.name.value
    welcomeSection.classList.add('hidden')
    video.classList.add('p-t-2rem')
    video.classList.add('visible')
    pName.textContent = `Ваше имя: ${name.value}`
    gameOver()
}, false)

document.body.onkeyup = function (ev) {
    if (ev.key === " " || ev.code === "Space") {
        if (startFlag) return
        startFlag = true
        video.classList.remove('visible')
        video.classList.add('hidden')
        if (!welcomeSection.classList.contains('hidden')) game.classList.add('hidden')
        else {
            game.classList.add('visible')
            interval = setInterval(updateTime, 1000)
            hpInterval = setInterval(updateHp, 1000)
            setInterval(generateHyenas, 10000)
        }
    }
    gameOver()
}

let seconds = 0;
let minutes = 0;
let interval;

function updateTime() {
    if (!isPaused) {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (hpScore <= 0) clearInterval(interval)
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

let hpInterval;
let hpScore = 100

function updateHp() {
    if (!isPaused) {
        hpScore--
        if (hpScore <= 0) clearInterval(hpInterval)
        HP.textContent = `Ваше здоровье: ${hpScore}`
    }
}

video.addEventListener('ended', function (ev) {
    video.classList.remove('visible')
    video.classList.add('hidden')
    if (!welcomeSection.classList.contains('hidden')) game.classList.add('hidden')
    else {
        game.classList.add('visible')
        interval = setInterval(updateTime, 1000);
        hpInterval = setInterval(updateHp, 1000)
        hyenaInterval = setInterval(hyenaMove, 1000)
        setInterval(generateHyenas, 10000)
    }
})

startBtn.disabled = true

name.addEventListener("change", () => {
    startBtn.disabled = name.value === '';
})


function charPerson(char) {
    if (char === 'timon') charImage.src = "Media/Тимон/267px-Тимон.png"
    else if (char === 'pumba') charImage.src = "Media/Пумба/pumbaa_by_lionkingrulez_d48mmf1-250t.png"
}


document.onkeydown = function (ev) {
    if (ev.key === "Escape" && startFlag) {
        body.classList.toggle('p-s')
        pause.classList.toggle('hidden')
        isPaused = !isPaused;
    }

}

function gameOver() {
    if (hpScore === 0) {
        gameOverFlag = true
        gameOverSection.classList.remove('hidden')

    }
}

newGameButton.addEventListener('click', function () {
    clearInterval(interval)
    clearInterval(hpInterval)
    seconds = 0
    minutes = 0
    interval = setInterval(updateTime, 1000)
    hpInterval = setInterval(updateHp, 1000)
    hpScore = 10
    gameOverFlag = false
    left = 0
    gameOverSection.classList.add('hidden')
    character.style.bottom = 0 + 'px'
    character.style.left = 0 + 'px'
    deleteHyenas()
    gameOver()
})


