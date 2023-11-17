let startBtn = document.querySelector('#start');
let screens = document.querySelectorAll('.screen');
let timeList = document.querySelector('#time-list');
let timeEl = document.querySelector('#time');
let board = document.querySelector('#board');
let time = 0;
let score = 0;
let timerId;
let countdownTime;
let countdownInterval;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        screens[1].classList.add('up');
        if(timerId) {
            clearInterval(timerId);
            score = 0;
        }
        time = parseInt(event.target.getAttribute('data-time'));
        startCountdown();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startCountdown() {
    countdownTime = 3;
    countdownInterval = setInterval(() => {
        if(countdownTime === 0) {
            clearInterval(countdownInterval);
            board.innerHTML = '';
            startGame();
        } else {
            board.innerHTML = `<div class='countdown'>${countdownTime--}</div>`;
        }
    }, 1000);
}

function startGame() {
    timerId = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    clearInterval(timerId);
    board.innerHTML = `<h1>Ваш счёт: <span class='primary'>${score}</span> </h1><button id="restart" class="restart-btn">Начать заново</button>`;
    let restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', ()=>{
        timeEl.parentNode.classList.remove('hide');
        screens[1].classList.remove('up');
        board.innerHTML = '';
    });
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
