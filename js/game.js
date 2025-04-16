
let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

gameStartAudio = new Audio('audio/gameStart.mp3');
finish_sound = new Audio('audio/finish_sound.mp3');

/**
 * start the game
 */
function startGame() {
    checkSpeakers();
    checkIfMobile();
    document.getElementById('start-screen').classList.add('d-none');
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
 * checked if mobile or display view before starting
 */
function checkIfMobile() {
    if (window.innerWidth <= 1400) {
        document.getElementById('mobile-overlay').classList.remove('d-none');
        document.getElementById('overlay-mute-button').classList.add('d-none');

    } else {
        document.getElementById('mobile-overlay').classList.add('d-none');
        document.getElementById('overlay-mute-button').classList.remove('d-none');
    }
}

/**
 * possibility to turn on/off the music after starting the game
 */
function playAudio() {
    this.gameStartAudio.play();
}

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
 * for using the keyboard to move the Character, jump, throw.
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
* it checks the using of mobile buttons
*/
window.addEventListener('DOMContentLoaded', () => {

    ['btnLeft', 'btnRight', 'btnJump', 'btnThrow'].forEach(id => {
        const btn = document.getElementById(id);
        btn.addEventListener('contextmenu', e => e.preventDefault());
    });

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
        // });
    }, { passive: false });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        // });
    }, { passive: false });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
        // });
    }, { passive: false });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
        // });
    }, { passive: false });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
        // });
    }, { passive: false });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
        // });
    }, { passive: false });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
        // });
    }, { passive: false });

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
        // });
    }, { passive: false });
});



// window.addEventListener('DOMContentLoaded', () => {
//     bindButton('btnLeft', 'LEFT');
//     bindButton('btnRight', 'RIGHT');
//     bindButton('btnJump', 'SPACE');
//     bindButton('btnThrow', 'D');
// });

// function bindButton(id, key) {
//     const div = document.getElementById("myDiv");
//     div.addEventListener("contextmenu", (e) => { e.preventDefault() });
// }