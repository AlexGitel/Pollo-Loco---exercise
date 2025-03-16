class Endboss extends MovableObject {

    y = 145;  // Position von Endboss
    height = 310; // Höhe von Endboss
    width = 200;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]); // erstes Bild laden
        this.loadImages(this.IMAGES_WALKING);  // und dann die andere
        this.x = 2600;
        this.animateEndboss();
    }

    animateEndboss() {
        // setInterval(() => {
        //     this.moveLeft(); // move Left um 0,15px mit Interval 60 Bilder / sec.
        // }, 1000 / 60);  // 1000 millisec / 60 Bilder pro sec.

        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 200);
    }
}