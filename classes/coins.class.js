class Coins extends MovableObject {

    y = 450;
    width = 80;
    height = 80;

    testOffset = {
        top: 30,
        right: 30,
        left: 30,
        bottom: 25,
    };

    COINS_IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.COINS_IMAGES);
        this.x = 350 + Math.random() * 2000;
        this.y = 150 + Math.random() * 220;
        this.animateCoins();
        this.offset = { x: 25, y: 25, width: 50, height: 50 };
    }

    /**
     * coins are moving, pulsating 
     */
    animateCoins() {
        setStoppableInterval(() => {
            this.animateImages(this.COINS_IMAGES);
        }, 200);
    }
}