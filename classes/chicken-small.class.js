class ChickenSmall extends MovableObject {

    y = 385;
    height = 50;
    width = 40;

    saveOffset = {
        top: 3,
        right: 3,
        left: 3,
        bottom: 0,
    };

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 350 + Math.random() * 2000;
        this.speed = 0.3 + Math.random() * 0.25;
        this.animateChicken();
        this.splicable = false;
        this.imageDead = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        this.isDead = false;
    }

    /**
     * chicken get moving to the left
     */
    animateChicken() {
        this.moveInterval = setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 70);

        this.walkingInterval = setStoppableInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 250);
    }

    /**
     * dead animation of chicken if is dead (image bevor removing)
     */
    playDeathAnimation() {
        this.isDead = true;
        this.speed = 0;
        clearInterval(this.moveInterval);
        clearInterval(this.walkingInterval);
        this.img.src = this.imageDead;
    }
}