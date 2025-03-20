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
        this.update();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {    // 24-60 x / sec.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
        this.ctx.translate(this.camera_x, 0);
        this.addArrayObjectsToMap(this.level.backgroundObjects);
        this.addArrayObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // camera moving Back for Statusbar
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0); // camera moving forwards for Statusbar
        this.addToMap(this.character);
        this.addArrayObjectsToMap(this.throwableObject);
        this.addArrayObjectsToMap(this.level.enemies);
        this.addArrayObjectsToMap(this.level.coins);
        this.addArrayObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);

        // draw() is called again and again
        let self = this; // self needed -> requestAnimationFrame don't accept 'this'.      
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * 
     * @param {Array} objects -like Array enemies (new Chicken(), new Chicken())
     */
    addArrayObjectsToMap(objects) {
        objects.forEach(singleObject => {
            this.addToMap(singleObject);
        });
    }

    /**
     * 
     * @param {every Object} movObj that you add to Map
     */
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
    update() {
        setInterval(() => {
            this.checkCollisionsEnemy();
            this.checkThrowObjects();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkBottlesAmount();
            this.checkThrowObjectCollision();
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
    * it check's, if D pressed, to throw a bootle and count bottles
    */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottlesAmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 120, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.character.bottlesAmount -= 20;
            setTimeout(() => { this.throwableObject.splice(0, 1) }, 1500);
        }
        if (this.character.bottlesAmount <= 0) {
            this.character.bottlesAmount = 0;
        }
    }

    /**
     * it check's if enemy hited
     */
    checkThrowObjectCollision() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    enemy.died();
                    // setTimeout(() => {
                    //     this.level.enemies.splice(enemyIndex, 1);
                    // }, 100);
                }
            });
        });
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