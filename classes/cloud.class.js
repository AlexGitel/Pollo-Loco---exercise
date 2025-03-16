class Cloud extends MovableObject {

    y = 10;
    width = 500;    // Clouds Position, Breite, Höhe
    height = 250;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animateCloud();
    }

    animateCloud() {
        setInterval(() => {
            this.moveLeft(); // um 0,15px 
        }, 1000 / 60); // mit Interval 60 x / sec.
    }
}