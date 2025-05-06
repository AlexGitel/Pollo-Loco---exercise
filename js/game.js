let gameIsRunning = true;

let canvas;
let world;
let character;
let keyboard = new Keyboard();
let intervalIds = [];
let mobileBtns = ['btnLeft', 'btnRight', 'btnJump', 'btnThrow'];
let isMuted = false;


const gameStartAudio = new Audio('audio/gameStart.mp3');
const finish_sound = new Audio('audio/finish_sound.mp3');
const you_lost = new Audio('audio/you_lost.mp3');
const soundForCoins = new Audio('audio/take_coin.mp3');
const walking_sound = new Audio('audio/walking.mp3');
const jumping_sound = new Audio('audio/juhu.mp3');
const squashing_sound = new Audio('audio/squash.mp3');
const getPain = new Audio('audio/pain.mp3');
const throw_bottle_sound = new Audio('audio/throw_bottle.mp3');
const burst_sound = new Audio('audio/burst_sound.mp3');
const endboss_alert = new Audio('audio/endboss.mp3');
const shock = new Audio('audio/shock.mp3');
const last_cry = new Audio('audio/last_cry.mp3');

let allSounds = [
    gameStartAudio,
    finish_sound,
    you_lost,
    soundForCoins,
    walking_sound,
    jumping_sound,
    squashing_sound,
    getPain,
    throw_bottle_sound,
    burst_sound,
    endboss_alert,
    shock,
    last_cry
];

let backgroundMusic = gameStartAudio;


/**
 * start the game
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    initLevel();
    init();

    const savedTime = localStorage.getItem('audioCurrentTime');
    if (savedTime !== null) {
        backgroundMusic.currentTime = parseFloat(savedTime);
    }

    if (!isMuted) {
        playAudio(backgroundMusic);
    }
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
    gameIsRunning = true;
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
 * Stop or continue playing sounds, save the position of the sound after interruption
 */
function toggleMute() {
    if (!isMuted) {
        localStorage.setItem('audioCurrentTime', backgroundMusic.currentTime);
    }
    isMuted = !isMuted;
    localStorage.setItem('muted', isMuted.toString());

    if (isMuted) {
        stopAudio(backgroundMusic);
    } else {
        const savedTime = localStorage.getItem('audioCurrentTime');
        if (savedTime !== null) {
            backgroundMusic.currentTime = parseFloat(savedTime);
        }
        playAudio(backgroundMusic);
    }
    updateMuteButtons(isMuted);
}


/**
 * To change speaker icons after muting or unmuting the sound.
 * @param {boolean} muted  true or false
 */
function updateMuteButtons(muted) {
    document.getElementById('mute-on')?.classList.toggle('d-none', muted);
    document.getElementById('mute-off')?.classList.toggle('d-none', !muted);
    document.getElementById('speaker-on')?.classList.toggle('d-none', muted);
    document.getElementById('speaker-off')?.classList.toggle('d-none', !muted);
}


function getMuteStatus() {
    const muted = localStorage.getItem('muted');
    isMuted = muted;
    // isMuted = muted === 'true';
}


/**
 * checked if mobile or display view, than removes aktion buttons or not
 */
function checkIfMobile() {
    if (window.innerWidth <= 1400) {
        document.getElementById('mobile-overlay').classList.remove('d-none');
    } else {
        document.getElementById('mobile-overlay').classList.add('d-none');
    }
}


/**
 * start playing audio
 */
function playAudio(audio) {
    if (!isMuted) {
        audio.play();
    }
}


/**
 * stop the playing audio
 */
function stopAudio(audio) {
    audio.pause();
}


/**
* shows Endscreen "You won"
*/
function showYouWon() {
    playAudio(finish_sound);
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/win/won_2.png";
    document.getElementById('mobile-overlay').classList.add('d-none');
    intervalIds.forEach(id => clearInterval(id));
    intervalIds.length = 0;
    gameIsRunning = false;
}


/**
* shows Endscreen "You lost"
*/
function showYouLost() {
    stopAudio(gameStartAudio);
    playAudio(you_lost);
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/game_over/oh no you lost!.png";
    document.getElementById('mobile-overlay').classList.add('d-none');
    intervalIds.forEach(id => clearInterval(id));
    intervalIds.length = 0;
    gameIsRunning = false;
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
            world.singleThrow = true;
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
            world.singleThrow = true;
        }, { passive: false });
    });


    /**
    * checks if the muted status exist and get it from the Local Storage.
    */
    window.addEventListener('DOMContentLoaded', getMuteStatus);


    /**
     * it saved the play position of sound 
     */
    window.addEventListener('beforeunload', () => {
        if (backgroundMusic && !isMuted) {
            localStorage.setItem('audioCurrentTime', backgroundMusic.currentTime);
        }
    });
}