class Level {
    backgroundObjects;
    clouds;
    enemies;
    coins;
    bottles;

    constructor(bgObj, clouds, enem, coins, bottles) {
        this.backgroundObjects = bgObj;
        this.clouds = clouds;
        this.enemies = enem;
        this.coins = coins;
        this.bottles = bottles;
    }
}