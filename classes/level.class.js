class Level {
    backgroundObjects;
    clouds;     // bekommt Variable aus world
    enemies;
    coins;
    bottles;

    constructor(bgObj, clouds, enem, coins, bottles) { // verbindet sich mit Variablen aus World.
        this.backgroundObjects = bgObj;
        this.clouds = clouds;
        this.enemies = enem;
        this.coins = coins;
        this.bottles = bottles;
    }
}