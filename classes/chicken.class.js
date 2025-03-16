class Chicken extends MovableObject {

    y = 375;    // Position von Chicken unter Y
    height = 60; // Höhe von allen Chicken
    width = 50; // Breite von Chicken

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 350 + Math.random() * 2000; // Math.random * 500 ergibt zufälliger Wert raus zw. 350 und 500
        // Math.random() zufällige Zahl ausgibt zw. 0 und 1

        this.speed = 0.23 + Math.random() * 0.25; // V mind. = 0,15 + zufällige Zahl * 0,25, so läuft je Hühnchen mit versch. Geschw.

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
}