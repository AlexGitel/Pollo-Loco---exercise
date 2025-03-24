class Endboss extends MovableObject {

    y = 145;
    height = 310;
    width = 200;
    speed = 1.25;


    IMAGES_ENDBOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'

    ];

    ENDBOSS_IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    ENDBOSS_IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    world;

    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.ENDBOSS_IMAGES_HURT);
        this.loadImages(this.ENDBOSS_IMAGES_DEAD);
        this.x = 2600;
        this.animateEndboss();
    }

    animateEndboss() {
        let counter = 0;
        let maxRepeat = 6;
        let intervalTime = setInterval(() => {
            if (this.world.character.x >= 2300) {
                this.animateImages(this.IMAGES_ENDBOSS_ALERT);
                counter++;
            }

            if (counter >= maxRepeat) {
                clearInterval(intervalTime);
                this.endbosstWalkingStart();
            }
        }, 200);

        setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.animateImages(this.ENDBOSS_IMAGES_DEAD);
                setTimeout(() => { this.world.level.enemies.splice([3], 1) }, 1200);
            }
        }, 200);
    }

    endbosstWalkingStart() {
        setInterval(() => {
            if (this.world.character.x <= 2400) {
                this.animateImages(this.IMAGES_WALKING);
                // this.moveLeft();
            }
        }, 250);
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }

}