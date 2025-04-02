
let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];


/**
 * start the game
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    initLevel();
    init();
}

/**
 * to initialize world
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * stop the game, clear all intervals, restart the game
 */
function stopGameAndRestart() {
    intervalIds.forEach(clearInterval);
    document.getElementById('game-over-screen').classList.add('d-none');
    startGame();
}

/**
 * 
 * @param {function of Intervals} fn 
 * @param {time (frequency) of intervals} time 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * to turn on/off audio speaker
 */
function toggleSpeakers() {
    document.getElementById('speaker-on').classList.toggle('d-none');
    document.getElementById('speaker-off').classList.toggle('d-none');
}

window.addEventListener("keydown", (ev) => { // it works only with keydown.   ev = event
    if (ev.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (ev.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (ev.keyCode == 38) {
        keyboard.UP = true;
    }
    if (ev.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (ev.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (ev.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (ev) => {
    if (ev.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (ev.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (ev.keyCode == 38) {
        keyboard.UP = false;
    }
    if (ev.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (ev.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (ev.keyCode == 68) {
        keyboard.D = false;
    }
});