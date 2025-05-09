class Endboss extends MovableObject {

    y = 137;
    height = 320;
    width = 200;
    speed = 12;

    testOffset = {
        top: 20,
        right: 10,
        left: 10,
        bottom: 0,
    };

    IMAGES_ENDBOSS_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'

    ];

    ENDBOSS_IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    ENDBOSS_IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    world;

    constructor() {
        super();
        this.loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ENDBOSS_IMAGES_HURT);
        this.loadImages(this.ENDBOSS_IMAGES_DEAD);
        this.x = 2600;
        this.animateEndboss();
        this.finalAnimation();
        this.isEndboss = true;
        this.offset = { x: 10, y: 40, width: 20, height: 55 };
    }

    /**
     * to animate Endboss if Character approaches
     */
    animateEndboss() {
        let counter = 0;
        let maxRepeat = 6;
        let intervalTime = setInterval(() => {
            if (this.world.character.x >= 2300) {
                stopAudio(gameStartAudio);
                playAudio(shock);
                playAudio(endboss_alert);
                this.animateImages(this.IMAGES_ENDBOSS_ALERT);
                counter++;
            }
            if (counter >= maxRepeat) {
                clearInterval(intervalTime);
                this.endbossWalkingStart();
            }
        }, 200);
    }

    /**
     * the Endboss starts attacking, pursue Character
     */
    endbossWalkingStart() {
        let walkTime = setInterval(() => {
            if (this.world.character.x <= 2400) {
                this.animateImages(this.IMAGES_WALKING);
                stopAudio(shock);
                if (!this.isDead() && !this.world.character.isDead()) {
                    this.persueCharacter();
                }
                if (this.isDead()) {
                    clearInterval(walkTime);
                }
                this.ifEndbossWon(walkTime);
            }
        }, 130);
    }

    /**
     * 
     * @param {param} walkTime to stop setInterval()
     * if character dead, Endboss goes to his start position
     */
    ifEndbossWon(walkTime) {
        if (this.world.character.isDead()) {
            this.otherDirection = true;
            this.speed = 23;
            this.moveRight()
            if (this.x >= 2600) {
                this.otherDirection = false;
                this.loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
                clearInterval(walkTime);
            }
        }
    }

    /**
     * to persue the character
     */
    persueCharacter() {
        if (this.world.character.x > this.x) {
            this.otherDirection = true;
            this.moveRight();
        } else if (this.world.character.x < this.x) {
            this.otherDirection = false;
            this.moveLeft();
        }
    }

    /**
      * to check: if dead - stop the moving, play dead.images, splice and show endscreen
      */
    finalAnimation() {
        let finalAnimation = setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.animateImages(this.ENDBOSS_IMAGES_DEAD);
                setTimeout(() => { this.world.level.enemies.splice(0, 1) }, 1500);
                playAudio(last_cry);
                if (this.world.level.enemies.length <= 0) {
                    showYouWon();
                    clearInterval(finalAnimation);
                }
            }
        }, 200);
    }
}