class Cloud extends MovableObject {

    y = 10;
    width = 500;
    height = 250;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animateCloud();
    }

    animateCloud() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}