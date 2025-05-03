
class ThrowableObject extends MovableObject {

    BOTTLES_ROTATING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLES_SPLASHING = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, characterOtherDirection) {
        super();
        this.loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLES_ROTATING);
        this.loadImages(this.BOTTLES_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.flyDirection = characterOtherDirection;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        let flyTime = setInterval(() => {
            this.flightRight();
            this.flightLeft();

            if (!this.isAboveGround()) {
                this.playSplashAnimation();
                stopAudio(throw_bottle_sound);
                playAudio(burst_sound);
                clearInterval(flyTime);
            }
        }, 25);
    }

    /**
     * flight of the bottle to the right after throwing
     */
    flightRight() {
        if (this.flyDirection === false && this.isAboveGround()) {
            this.x += 6;
            this.animateImages(this.BOTTLES_ROTATING);
            playAudio(throw_bottle_sound);
        }
    }

    /**
    * flight of the bottle to the left after throwing
    */
    flightLeft() {
        if (this.flyDirection === true && this.isAboveGround()) {
            this.x -= 6;
            this.animateImages(this.BOTTLES_ROTATING);
            playAudio(throw_bottle_sound);
        }
    }

    /**
    * Plays the splash animation of the bottle
    */
    playSplashAnimation() {
        let index = 0;
        setStoppableInterval(() => {
            if (index < this.BOTTLES_SPLASHING.length) {
                this.loadImage(this.BOTTLES_SPLASHING[index]);
                index++;
            }
        }, 60);
    }
}