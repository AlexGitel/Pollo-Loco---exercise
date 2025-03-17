class Chicken extends MovableObject {

    y = 375;    // Position von Chicken unter Y
    height = 60; // Höhe von allen Chicken
    width = 50; // Breite von Chicken

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DIED = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 350 + Math.random() * 2000;
        this.speed = 0.23 + Math.random() * 0.25;
        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 50);  // 1000 millisec / 50 Bilder pro sec.


        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 270);
    }

    died() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}