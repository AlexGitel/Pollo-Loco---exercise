class Cloud extends MovableObject {

    y = 10;
    width = 500;
    height = 250;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animateCloud();
    }

    /**
     * clouds get moving
     */
    animateCloud() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}