
let canvas;
let world;
let character;
let keyboard = new Keyboard();
let intervalIds = [];
let mobileBtns = ['btnLeft', 'btnRight', 'btnJump', 'btnThrow'];

gameStartAudio = new Audio('audio/gameStart.mp3');
finish_sound = new Audio('audio/finish_sound.mp3');

/**
 * start the game
 */
function startGame() {
    checkSpeakers();
    checkIfMobile();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('title').classList.remove('d-none');
    initLevel();
    init();
    this.gameStartAudio.play();
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
    intervalIds = [];
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
function toggleSpeakersDisplay() {
    document.getElementById('mute-on').classList.toggle('d-none');
    document.getElementById('mute-off').classList.toggle('d-none');
}

/**
 * to turn on/off audio speaker
 */
function toggleSpeakersMobile() {
    document.getElementById('speaker-on').classList.toggle('d-none');
    document.getElementById('speaker-off').classList.toggle('d-none');
}

/**
 * checked mute-button before starting
 */
function checkSpeakers() {
    document.getElementById('speaker-on').classList.remove('d-none');
    document.getElementById('speaker-off').classList.add('d-none');
}

/**
 * checked if mobile or display view, than removes aktion buttons or not
 */
function checkIfMobile() {
    if (window.innerWidth <= 1024) {
        document.getElementById('mobile-overlay').classList.remove('d-none');
        document.getElementById('overlay-mute-button').classList.add('d-none');

    } else {
        document.getElementById('mobile-overlay').classList.add('d-none');
        document.getElementById('overlay-mute-button').classList.remove('d-none');
    }
}

/**
 * possibility to turn on the start audio after starting the game
 */
function playAudio() {
    this.gameStartAudio.play();
}

/**
 * possibility to turn off the start audio and reset to beginning of the audio
 */
function pauseAudio() {
    gameStartAudio.pause();
    gameStartAudio.currentTime = 0;
}

/**
* shows Endscreen with image "You won"
*/
function showYouWon() {
    this.finish_sound.play();
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/win/won_2.png";
    document.getElementById('overlay-mute-button').classList.add('d-none');
    document.getElementById('mobile-overlay').classList.add('d-none');
    intervalIds.forEach(clearInterval);
}

/**
* shows Endscreen with image "You lost"
*/
function showYouLost() {
    this.gameStartAudio.pause();
    this.gameStartAudio.currentTime = 0;
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/game_over/oh no you lost!.png";
    document.getElementById('overlay-mute-button').classList.add('d-none');
    document.getElementById('mobile-overlay').classList.add('d-none');
    intervalIds.forEach(clearInterval);
}

/**
 * for using the keyboard to move the Character, jump, throw. Listens if key is up
 */
window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowLeft":
            keyboard.LEFT = false;
            break;
        case "ArrowRight":
            keyboard.RIGHT = false;
            break;
        case "Space":
            keyboard.SPACE = false;
            break;
        case "KeyD":
            keyboard.D = false;
            break;
    }
});

/**
* for using the keyboard to move the Character, jump, throw. Listens if key is up
*/
window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowLeft":
            keyboard.LEFT = true;
            break;
        case "ArrowRight":
            keyboard.RIGHT = true;
            break;
        case "Space":
            keyboard.SPACE = true;
            break;
        case "KeyD":
            keyboard.D = true;
            break;
    }
});

/**
* using of buttons on mobile devices, mobile screen
*/
window.addEventListener('DOMContentLoaded', () => {
    mobileBtns.forEach(id => {
        const btn = document.getElementById(id);
        btn.addEventListener('contextmenu', event => event.preventDefault());
    });
    mobileBtnPress();
    mobileBtnRelease();
});

/**
 * listens for touch events on mobile devices - touchstart
 * @param {string} id  - the id of the button
 */
function mobileBtnPress() {
    mobileBtns.forEach(id => {
        document.getElementById(id).addEventListener('touchstart', (event) => {
            event.preventDefault();

            if (id === 'btnLeft') keyboard.LEFT = true;
            else if (id === 'btnRight') keyboard.RIGHT = true;
            else if (id === 'btnJump') keyboard.SPACE = true;
            else if (id === 'btnThrow') keyboard.D = true;
        }, { passive: false });
    });
}

/**
 * listens if the touch button is released  - touchend
 * @param {string} id  - the id of the button
 */
function mobileBtnRelease() {
    mobileBtns.forEach(id => {
        document.getElementById(id).addEventListener('touchend', (event) => {
            event.preventDefault();

            if (id === 'btnLeft') keyboard.LEFT = false;
            else if (id === 'btnRight') keyboard.RIGHT = false;
            else if (id === 'btnJump') keyboard.SPACE = false;
            else if (id === 'btnThrow') keyboard.D = false;
        }, { passive: false });
    });
}