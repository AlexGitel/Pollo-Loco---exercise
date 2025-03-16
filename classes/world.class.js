class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {    // 24-60 x / sec.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // camera moving Back for Statusbar
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0); // camera moving forwards for Statusbar
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);

        let self = this; // self needed -> requestAnimationFrame don't accept 'this'.      
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(singleObject => {
            this.addToMap(singleObject);
        });
    }

    addToMap(movObj) {
        if (movObj.otherDirection) {
            this.flipImage(movObj);
        }

        this.ctx.drawImage(movObj.img, movObj.x, movObj.y, movObj.width, movObj.height);

        movObj.drawFrame(this.ctx); // it draws blue Frames around the Objects

        if (movObj.otherDirection) {
            this.flipImageBack(movObj);
        }
    }

    flipImage(movObj) {
        this.ctx.save(); // it save's the actualy Position of Character

        this.ctx.translate(movObj.width, 0); // Object, around his width 
        this.ctx.scale(-1, 1); // -1:  in x-Achse 180° 

        movObj.x = movObj.x * -1;
    }

    flipImageBack(movObj) {
        movObj.x = movObj.x * -1;
        this.ctx.restore();
    }

    /**
     * checked if character get colliding or keyboard - pressed 
     */
    run() {
        setInterval(() => {
            this.checkCollisionsEnemy();
            this.checkThrowObjects();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkBottlesAmount();
        }, 200);
    }

    /**
     * checked if character is colliding enemys
     */
    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * checked if character is colliding coins
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.character.getCoin();
                this.statusbarCoins.setPercentage(this.character.coinsAmount);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * checked if character is colliding bottles
     */
    checkCollisionsBottles() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isColliding(bottles)) {
                this.character.getBottle();
                this.statusbarBottles.setPercentage(this.character.bottlesAmount);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
    * it check's, if D pressed, to throw a bootle
    */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottlesAmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 45, this.character.y + 90, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.character.bottlesAmount -= 20;
            setTimeout(() => { this.throwableObject.splice(0, 1) }, 1500); // clear Array
        }
        if (this.character.bottlesAmount <= 0) {
            this.character.bottlesAmount = 0;
        }
    }

    /**
    * Number of bottles at the start and after throwing
    */
    checkBottlesAmount() {
        if (this.character.bottlesAmount <= 100) {
            this.statusbarBottles.setPercentage(this.character.bottlesAmount);
        }
    }
}