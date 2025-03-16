
class BackgroundObject extends MovableObject {

    width = 1440; // Breite von Background, da png 1440px Breit ist
    height = 480; // Höhe und Breite von Hintergrundobjekten

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0; // 480 - this.height, also oben rechts ist 0 Punkt
    }
}