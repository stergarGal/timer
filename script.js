let hr = 0, min = 0, sec = 0, core = 0, lapTime = 0, start, i = 0;
let timer = document.getElementById('timer');
let startButton = document.getElementById('start-btn');
let lapButton = document.getElementById('lap-btn');
let resetButton = document.getElementById('reset-btn');
let laps = document.getElementById('laps');
let storedLaps;
if (localStorage.Laps) {
    storedLaps = JSON.parse(localStorage.Laps);
    writeLaps();
} else {
    storedLaps = [];
}
timer.innerHTML = "00:00:00";

startButton.addEventListener('click', startTimer);
lapButton.addEventListener('click', addLap);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    start = setInterval(function () { increaseTimer(); }, 1000);
    startButton.innerHTML = "Pause";
    startButton.removeEventListener('click', startTimer);
    startButton.addEventListener('click', pause);
}

function pause() {
    clearInterval(start);
    startButton.innerHTML = "Start";
    startButton.removeEventListener('click', pause);
    startButton.addEventListener('click', startTimer);
}

function increaseTimer() {
    sec++;
    core++;

    if (sec >= 60) {
        sec = 0;
        min++;

        if (min >= 60) {
            min = 0;
            hr++;
        }

    }
    updateTimer();
}

function updateTimer() {
    timer.innerHTML = (hr <= 9 ? "0" + hr : hr) + ':' + (min <= 9 ? "0" + min : min) + ':' + (sec <= 9 ? "0" + sec : sec);
}

function addLap() {
    laps.innerHTML = "";
    i++;

    let lapMin = 0, lapHr = 0;
    let lapSec = core - lapTime;
    lapTime = core;

    if (lapSec >= 60) {
        lapSec = 0;
        lapMin++;

        if (lapMin >= 60) {
            lapMin = 0;
            lapHr++;
        }

    }

    lapTimer = (lapHr <= 9 ? "0" + lapHr : lapHr) + ':' + (lapMin <= 9 ? "0" + lapMin : lapMin) + ':' + (lapSec <= 9 ? "0" + lapSec : lapSec);

    storedLaps.push(lapTimer);
    localStorage.setItem("Laps", JSON.stringify(storedLaps));
    writeLaps();

}

function writeLaps() {
    let fromLocalStorage = JSON.parse(localStorage.Laps);
    for (let j = 0; j < fromLocalStorage.length; j++) {
        var div = document.createElement("p");
        div.setAttribute("id", "lap" + j);
        div.innerHTML = fromLocalStorage[j];
        laps.appendChild(div);

    }
}

function resetTimer() {
    pause();
    localStorage.removeItem('Laps');
    storedLaps = [];
    hr = 0; min = 0; sec = 0; core = 0; lapTime = 0; i = 0;
    timer.innerHTML = "00:00:00";
    laps.innerHTML = "";
}