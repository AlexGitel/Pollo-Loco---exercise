class MovableObject extends DrawableObject {

    speed = 0.15; // for moving Left/Right

    otherDirection = false; // to mirror image - usualy false (to turn and move to the LEFT)
    speedY = 0; // speed by falling down.
    acceleration = 3;

    energy = 100;
    coinsAmount = 0;
    bottlesAmount = 100;
    lastHit = 0;


    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * 
     * @param {Array} images - ['img/image1.png, img/image2.png ....]
     */
    animateImages(images) {
        let i = this.currentImage % images.length; // (% - Modulo) - gerechnet so: i = 0 % 6 Indexe(Bilder) = 0,  1 % 6 => 1,  2 % 6 => 2  .....
        // Ergebnisse: 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0........ somit entsteht Dauerschleife durch BilderArray

        let path = images[i];
        this.img = this.imagesCache[path];
        this.currentImage++;
    }

    /**
     * falling of Character onto the ground
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * position of Character or Bottle over the ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y <= 360;
        } else {
            return this.y < 190;
        }
    }

    /**
     *  if Character.isColliding(Chicken, Endboss, enemies, coins)
     */
    isColliding(movObj) {
        return this.x + this.width > movObj.x &&
            this.y + this.height > movObj.y &&
            this.x < movObj.x + movObj.width &&
            this.y < movObj.y + movObj.height;
    }

    /**
    * if Character is hitted
    */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * to fill the life statusbar
     */
    getCoin() {
        this.coinsAmount += 15;
    }

    /**
     * to collect the bottles for throwing
     */
    getBottle() {
        if (this.bottlesAmount < 100) {
            this.bottlesAmount += 20;
        } else if (this.bottlesAmount >= 100) {
            this.bottlesAmount += 0;
        }
    }

    /**
    * life statusbar of Character = 0 - dead.
    */
    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // Difference in sec
        return timepassed < 1; // true will be returned
    }
}