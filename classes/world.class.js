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
    singleThrow = true;

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
        // this.addToMap(this.character);
        this.addArrayObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
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
     * @param {Object} movObj that you add to Map
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
     * @param {Object, like Character or Endboss} movObj 
     */
    flipImage(movObj) {
        this.ctx.save();
        this.ctx.translate(movObj.width, 0);
        this.ctx.scale(-1, 1);
        movObj.x = movObj.x * -1;
    }

    /**
     * to flip the image back
     * @param {Object, like Character or Endboss} movObj 
     */
    flipImageBack(movObj) {
        movObj.x = movObj.x * -1;
        this.ctx.restore();
    }

    /**
     * checked if character is colliding enemys, running or jumping
     */
    checkCollisionsEnemy() {  //  MEINE VARIANTE
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy)) {
                let fallingDown = this.character.speedY > 0;
                let characterBottom = (this.character.y + this.character.height) - enemy.height;

                console.log('Pepe - bottom ', characterBottom);
                console.log('Chicken - top', enemy.y);


                if (fallingDown && characterBottom < enemy.y) {
                    console.log('er fällt', fallingDown);
                    enemy.damaged();
                    this.character.speedY = 20;
                    setTimeout(() => { this.level.enemies.splice(i, 1); }, 150);
                } else {
                    this.lostEnergy();
                }
            }
        });
    }

    // checkCollisionsEnemy() { //   VARIANTE ChatGPT
    //     let enemiesToRemove = [];

    //     this.level.enemies.forEach((enemy, i) => {
    //         if (this.character.isColliding(enemy)) {
    //             let fallingDown = this.character.speedY > 0;
    //             // let characterBottom = (this.character.y + this.character.height) - enemy.height;
    //             let characterBottom = this.character.y + this.character.height;

    //             console.log('Pepe - bottom ', characterBottom);
    //             console.log('Chicken - top', enemy.y);

    //             if (fallingDown && characterBottom < enemy.y + 20) {
    //                 console.log('er fällt', fallingDown);
    //                 enemy.damaged();
    //                 this.character.speedY = 20;
    //                 enemiesToRemove.push(i);
    //             } else {
    //                 this.lostEnergy();
    //             }
    //         }
    //     });

    //     enemiesToRemove.reverse().forEach(i => {
    //         this.level.enemies.splice(i, 1);
    //     });
    // }

    /**
     * if collision with enemy, character loses his energy
     */
    lostEnergy() {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }

    /**
     * if character is colliding coins, he collect it,
     * if coins amount > 100, adds life to the character
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coins, index) => {
            this.collectCoins(coins, index);

            if (this.character.coinsAmount >= 100 && this.character.energy < 100) {
                this.character.energy += 50;
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * the coins will be collected
     * @param {Object} - each coins 
     * @param {number} - index of coins
     */
    collectCoins(coins, index) {
        if (this.character.isColliding(coins)) {
            this.character.getCoin();
            soundForCoins.play();
            this.statusbarCoins.setPercentage(this.character.coinsAmount);
            this.level.coins.splice(index, 1);
        }
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
    * it check's, if D pressed, to throw a bootle and counts rest of bottles
    */
    checkThrowObjects() {
        this.keyPressed();
        if (this.character.bottlesAmount <= 0) {
            this.character.bottlesAmount = 0;
        }
    }

    /**
     * key D is pressed, bottle has been thrown
     */
    keyPressed() {
        let singleShot = this.keyboard.D && this.singleThrow;
        if (singleShot && this.character.bottlesAmount > 0) {
            this.singleThrow = false;
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 120, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.character.bottlesAmount -= 20;

            setTimeout(() => {
                this.throwableObject.splice(0, 1);
            }, 1500);
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
                    this.enemyConsequences(enemy, i);
                }
            }
        });
    }

    /**
     * the consequences when an enemy is hit by a bottle.
     * @param {Object} - each enemy that got hit
     * @param {number} - index of the enemy
     */
    enemyConsequences(enemy, i) {
        enemy.hit();
        this.statusbarEndboss.setPercentage(enemy.energy);
        enemy.damaged();
        if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
            setTimeout(() => {
                this.level.enemies.splice(i, 1)
            }, 150);
        }
    }

    /**
    * regulates number of bottles at the start and after throwing
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