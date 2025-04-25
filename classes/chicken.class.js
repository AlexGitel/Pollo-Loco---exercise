class Chicken extends MovableObject {

    y = 375;
    height = 60;
    width = 50;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 350 + Math.random() * 2000;
        this.speed = 0.23 + Math.random() * 0.25;
        this.animateChicken();
    }

    /**
     * chicken get moving to the left
     */
    animateChicken() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 50);

        setStoppableInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 270);
    }
}