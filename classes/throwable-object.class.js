
class ThrowableObject extends MovableObject {

    BOTTLES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLES_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, characterOtherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLES_ROTATING);
        this.loadImages(this.BOTTLES_SPLASHING);
        this.x = x;
        this.y = y;
        this.flyDirection = characterOtherDirection;
        this.height = 60;
        this.width = 60;
        this.throw();
    }

    /**
     * to throw the bottles
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        let flyTime = setInterval(() => {
            if (this.flyDirection === false && this.isAboveGround()) {
                this.x += 8;
                this.animateImages(this.BOTTLES_ROTATING);
            }
            if (this.flyDirection === true && this.isAboveGround()) {
                this.x -= 8;
                this.animateImages(this.BOTTLES_ROTATING);
            } else
                if (!this.isAboveGround()) {
                    this.playSplashAnimation();
                    clearInterval(flyTime);
                }
        }, 25);
    }

    /**
    * Plays the splash animation and then stops
    */
    playSplashAnimation() {
        let index = 0;
        setInterval(() => {
            if (index < this.BOTTLES_SPLASHING.length) {
                this.loadImage(this.BOTTLES_SPLASHING[index]);
                index++;
            }
        }, 60);
    }
}