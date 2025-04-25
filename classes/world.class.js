class World {

    level = level1;
    canvas;
    ctx;
    keyboard;
    character = new Character();
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.update();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies[3].world = this;
    }

    /**
     * to draw the images on the map
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addArrayObjectsToMap(this.level.backgroundObjects);
        this.addArrayObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addArrayObjectsToMap(this.throwableObject);
        this.addArrayObjectsToMap(this.level.enemies);
        this.addArrayObjectsToMap(this.level.coins);
        this.addArrayObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);

        this.character.updateAnimationCharacter();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * 
     * @param {Array} objects - Array for enemies (new Chicken(), new Chicken())
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

        if (movObj.otherDirection) {
            this.flipImageBack(movObj);
        }
    }

    /**
     * to flip the image over the 180° Axis
     * @param {like Character or Endboss} movObj 
     */
    flipImage(movObj) {
        this.ctx.save();
        this.ctx.translate(movObj.width, 0);
        this.ctx.scale(-1, 1);
        movObj.x = movObj.x * -1;
    }

    /**
     * to flip the image back
     * @param {like Character or Endboss} movObj 
     */
    flipImageBack(movObj) {
        movObj.x = movObj.x * -1;
        this.ctx.restore();
    }

    /**
     * checked if character is colliding enemys, running or jumping
     */
    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy)) {
                let fallingDown = this.character.speedY > 0 && this.character.isAboveGround();
                if (enemy instanceof Endboss) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                } else {
                    if (fallingDown || this.character.y + this.character.height - enemy.height < enemy.y) {
                        enemy.damaged();
                        setTimeout(() => { this.level.enemies.splice(i, 1); }, 150);
                        this.character.speedY = 20;
                    } else {
                        this.character.hit();
                        this.statusbarHealth.setPercentage(this.character.energy);
                    }
                }
            }
        });
    }

    /**
     * checked if character is colliding coins, if coins > 100, adds life to the character
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.character.getCoin();
                soundForCoins.play();
                this.statusbarCoins.setPercentage(this.character.coinsAmount);
                this.level.coins.splice(index, 1);
            }
            if (this.character.coinsAmount >= 100 && this.character.energy < 100) {
                this.character.energy += 50;
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * if character is colliding bottles, checked, collect bottles or not
     */
    checkCollisionsBottles() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isColliding(bottles)) {
                if (this.character.bottlesAmount < 100) {
                    this.character.getBottle();
                    this.statusbarBottles.setPercentage(this.character.bottlesAmount);
                    this.level.bottles.splice(index, 1);
                }
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
    bottleHitEnemy() {
        this.throwableObject.forEach((bottle) => {
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                let enemy = this.level.enemies[i];
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    this.statusbarEndboss.setPercentage(enemy.energy);
                    enemy.damaged();
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) { setTimeout(() => { this.level.enemies.splice(i, 1) }, 150); }
                }
            }
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

    /**
     * checked if character get colliding or keyboard - pressed 
     */
    update() {
        setStoppableInterval(() => {
            this.checkCollisionsEnemy();
            this.checkThrowObjects();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkBottlesAmount();
            this.bottleHitEnemy();
        }, 200);
    }
}