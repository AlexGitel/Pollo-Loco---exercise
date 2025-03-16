class Coins extends MovableObject {

    y = 450;
    width = 80;
    height = 80;

    COINS_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COINS_IMAGES);
        this.x = 350 + Math.random() * 2000;
        this.y = 80 + Math.random() * 240;
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.animateImages(this.COINS_IMAGES);
        }, 200);
    }
}