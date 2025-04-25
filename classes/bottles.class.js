class Bottles extends MovableObject {

    y = 380;
    width = 60;
    height = 60

    IMAGES_BOTTLES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'

    ];

    constructor() {
        super();
        let eachImg = this.IMAGES_BOTTLES[Math.random() * 2 | 0];
        this.loadImage(eachImg);
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 350 + Math.random() * 1900;
    }
}