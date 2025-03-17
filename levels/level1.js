const level1 = new Level(

    [
        new BackgroundObject('img/5_background/layers/air.png', - 1438),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', - 1438),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', - 1438),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', - 1438),

        new BackgroundObject('img/5_background/layers/air.png', 0), // images einfügen an der x Koordinate 0
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 1438),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 1438),   // full hat 1440px Breite
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 1438),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 1438)
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/2.png', -319),
        new Cloud('img/5_background/layers/4_clouds/1.png', 150),
        new Cloud('img/5_background/layers/4_clouds/2.png', 700),
        new Cloud('img/5_background/layers/4_clouds/1.png', 700 * 2),
        new Cloud('img/5_background/layers/4_clouds/2.png', 600 * 4)
    ],
    [
        // new Chicken(),
        // new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ],
    [

        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles()
    ]
);