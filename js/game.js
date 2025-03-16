
let canvas;
let world;
let keyboard = new Keyboard(); // neue Instanz erstellt


function init() {
    canvas = document.getElementById('canvas');
    // world wird dem init übergeben zum Aufrufen
    world = new World(canvas, keyboard); // NEue Instanz mit keyboard wie canvas an die World übergeben.
}

window.addEventListener("keydown", (ev) => { // it works only with keydown, not onkeydown or onkeypress.    ev = event
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