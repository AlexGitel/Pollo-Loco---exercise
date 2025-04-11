
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    // THROW_STOP = new Date().getTime();
    // THROW_START = 0;

    // constructor() {
    //     // this.keyPressEvents();
    //     this.btnPressEvents();
    // }

    // /**
    // * it checks the using of mobile buttons
    // */
    // btnPressEvents() {
    //     document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.LEFT = true;
    //     });
    //     document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.LEFT = false;
    //     });
    //     document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.RIGHT = true;
    //     });
    //     document.getElementById('btnRight').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.RIGHT = false;
    //     });
    //     document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.SPACE = true;
    //     });
    //     document.getElementById('btnJump').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.SPACE = false;
    //     });

    //     document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         if (this.THROW_STOP > this.THROW_START && !e.repeat) {
    //             if ((new Date().getTime() - this.THROW_START) > 1000) {
    //                 this.THROW_START = new Date().getTime();
    //             }
    //             this.D = true;
    //         }
    //     });


    //     document.getElementById('btnThrow').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.THROW_STOP = new Date().getTime();
    //         this.D = false;
    //     });
    // }








    /**
     * it checks the using of keyboard
     */
    // keyPressEvents() {
    //     window.addEventListener("keydown", (ev) => { // it works only with keydown.   ev = event
    //         if (ev.keyCode == 39) {
    //             this.RIGHT = true;
    //         }

    //         if (ev.keyCode == 37) {
    //             this.LEFT = true;
    //         }

    //         if (ev.keyCode == 38) {
    //             this.UP = true;
    //         }
    //         if (ev.keyCode == 40) {
    //             this.DOWN = true;
    //         }
    //         if (ev.keyCode == 32) {
    //             this.SPACE = true;
    //         }
    //         if (ev.keyCode == 68) {
    //             this.D = true;
    //         }
    //     });


    //     window.addEventListener("keyup", (ev) => {
    //         if (ev.keyCode == 39) {
    //             this.RIGHT = false;
    //         }

    //         if (ev.keyCode == 37) {
    //             this.LEFT = false;
    //         }

    //         if (ev.keyCode == 38) {
    //             this.UP = false;
    //         }
    //         if (ev.keyCode == 40) {
    //             this.DOWN = false;
    //         }
    //         if (ev.keyCode == 32) {
    //             this.SPACE = false;
    //         }
    //         if (ev.keyCode == 68) {
    //             this.D = false;
    //         }
    //     });
    // }

}
