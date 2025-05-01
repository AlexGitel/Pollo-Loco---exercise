
let canvas;
let world;
let character;
let keyboard = new Keyboard();
let intervalIds = [];
let mobileBtns = ['btnLeft', 'btnRight', 'btnJump', 'btnThrow'];
let isMuted = false;

allSounds = [
    gameStartAudio = new Audio('audio/gameStart.mp3'),
    finish_sound = new Audio('audio/finish_sound.mp3'),
    you_lost = new Audio('audio/you_lost.mp3'),
    soundForCoins = new Audio('audio/take_coin.mp3'),
    walking_sound = new Audio('audio/walking.mp3'),
    jumping_sound = new Audio('audio/juhu.mp3'),
    squashing_sound = new Audio('audio/squash.mp3'),
    getPain = new Audio('audio/pain.mp3'),
    throw_bottle_sound = new Audio('audio/throw_bottle.mp3'),
    burst_sound = new Audio('audio/burst_sound.mp3'),
    endboss_alert = new Audio('audio/endboss.mp3'),
    shock = new Audio('audio/shock.mp3'),
    last_cry = new Audio('audio/last_cry.mp3')
];

/**
 * start the game
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    initLevel();
    init();
    playAudio(this.gameStartAudio);
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
    stopAudio(this.you_lost);
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
    isMuted = !isMuted;
    allSounds.forEach(sound => {
        sound.muted = isMuted;
    });
}

/**
 * to turn on/off audio speaker
 */
function toggleSpeakersMobile() {
    document.getElementById('speaker-on').classList.toggle('d-none');
    document.getElementById('speaker-off').classList.toggle('d-none');
    isMuted = !isMuted;
    allSounds.forEach(sound => {
        sound.muted = isMuted;
    });
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
    audio.play();
}

/**
 * stop the playing audio
 */
function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

/**
* shows Endscreen "You won"
*/
function showYouWon() {
    this.finish_sound.play();
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/win/won_2.png";
    document.getElementById('mobile-overlay').classList.add('d-none');
    intervalIds.forEach(clearInterval);
}

/**
* shows Endscreen "You lost"
*/
function showYouLost() {
    stopAudio(this.gameStartAudio);
    playAudio(this.you_lost);
    document.getElementById('game-over-screen').classList.remove('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/game_over/oh no you lost!.png";
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
}