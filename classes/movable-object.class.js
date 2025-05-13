class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    coinsAmount = 0;
    bottlesAmount = 100;
    lastHit = 0;

    // offset = {
    //     x: 0,
    //     y: 0,
    //     width: 0,
    //     height: 0
    // }

    testOffset = {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }

    /**
     * moving of movable objects, like Character, Endboss
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * moving of movable objects, like Character, Endboss
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * 
     * @param {Array} images - ['img/image1.png, img/image2.png ....]
     */
    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imagesCache[path];
        this.currentImage++;
    }

    /**
    * to play images only one time and then stop.
    * @param {Array} images - ['img/image1.png, img/image2.png ....]
    */
    animateImagesOnce(images) {
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imagesCache[path];
            this.currentImage++;
            if (this.currentImage === images.length) {
                this.currentImage < images.length;
            }
        }
    }

    /**
     * falling onto the ground
     */
    applyGravity() {
        setStoppableInterval(() => {
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
            return this.y < 185;
        }
    }

    /**
     *  if Character.isColliding(Chicken, Endboss, enemies, coins)
     */
    isColliding(movObj) {
        return (
            this.x + this.width - this.testOffset.right > movObj.x + movObj.testOffset.left &&
            this.y + this.height - this.testOffset.bottom > movObj.y + movObj.testOffset.top &&
            this.x + this.testOffset.left < movObj.x + movObj.width - movObj.testOffset.right &&
            this.y + this.testOffset.top < movObj.y + movObj.height - movObj.testOffset.bottom
        )
    }


    /**
    * Character or Endboss energy level after be hitted
    */
    hit() {
        if (this instanceof Character || this instanceof Endboss) {
            this.energy -= 1;
            if (this.energy < 0) {
                this.energy = 0;
            }
            else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * to fill the coin statusbar and than increase live of character
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
        }
    }

    /**
    * life statusbar of Character / Endboss = 0.
    */
    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * if enemy hited, it shows images that enemies are damaged
     */
    damaged() {
        this.chickensGetDamage();
        this.endbossGetDamage();
    }

    /**
     * if enemy damaged, the image of dead enemy will be shown
     */
    chickensGetDamage() {
        if (this instanceof Chicken || this instanceof ChickenSmall) {
            playAudio(squashing_sound);
        }
    }

    /**
     * if enemy damaged, the image of dead Endboss will be shown
     */
    endbossGetDamage() {
        if (this instanceof Endboss) {
            this.animateImages(this.ENDBOSS_IMAGES_HURT);
        }
    }
}