class Chicken extends MovableObject {

    y = 375;
    height = 60;
    width = 50;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DIED = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
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
        }, 1000 / 50);

        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);

            if (this.hit()) {
                this.animateImages(this.IMAGES_DIED);

            }
        }, 270);
    }

    died() {
        // this.animateImages(this.IMAGES_DIED);

        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}