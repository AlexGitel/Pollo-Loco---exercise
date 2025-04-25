class Endboss extends MovableObject {

    y = 145;
    height = 310;
    width = 200;
    speed = 16;

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

    // endboss_alert = new Audio('audio/endboss.mp3');
    // shock = new Audio('audio/shock.mp3');
    // last_cry = new Audio('audio/last_cry.mp3');

    constructor() {
        super();
        this.loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ENDBOSS_IMAGES_HURT);
        this.loadImages(this.ENDBOSS_IMAGES_DEAD);
        this.x = 2600;
        this.animateEndboss();
        this.isEndboss = true;
    }

    /**
     * to animate Endboss if Character approaches
     */
    animateEndboss() {
        let counter = 0;
        let maxRepeat = 6;
        let intervalTime = setInterval(() => {
            if (this.world.character.x >= 2300) {
                gameStartAudio.pause();
                gameStartAudio.currentTime = 0;
                shock.play();
                endboss_alert.play();
                this.animateImages(this.IMAGES_ENDBOSS_ALERT);
                counter++;
            }
            if (counter >= maxRepeat) {
                clearInterval(intervalTime);
                this.endbossWalkingStart();
            }
        }, 200);

        /**
        * to check: if dead - stop the moving, play dead.images, splice and show endscreen
        */
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.animateImages(this.ENDBOSS_IMAGES_DEAD);
                setTimeout(() => { this.world.level.enemies.splice(0, 1) }, 1300);
                last_cry.play();

                if (this.world.level.enemies.length <= 0) {
                    last_cry.pause();
                    last_cry.currentTime = 0;
                    showYouWon();
                }
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
                this.persueCharacter();

                if (this.isDead()) {
                    clearInterval(walkTime);
                }
            }
        }, 160);
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
}