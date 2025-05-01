class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    coinsAmount = 0;
    bottlesAmount = 100;
    lastHit = 0;
    offsetY = 15;

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
     * falling of Character onto the ground
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
        return (this.x + this.width) >= movObj.x &&
            this.x <= (movObj.x + movObj.width) &&
            (this.y + this.height + this.offsetY) >= movObj.y &&
            (this.y + this.offsetY) <= (movObj.y + movObj.height);
    }

    /**
    * Character or Endboss energy level after be hitted
    */
    hit() {
        if (this instanceof Character || this instanceof Endboss) {
            this.energy -= 1.3;
            if (this.energy < 0) {
                this.energy = 0;
            }
            else {
                this.lastHit = new Date().getTime();
            }
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

    chickensGetDamage() {
        if (this instanceof Chicken) {
            this.speed = 0;
            this.loadImage('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            playAudio(squashing_sound);
        }
        if (this instanceof ChickenSmall) {
            this.speed = 0;
            this.loadImage('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            playAudio(squashing_sound);
        }
    }

    endbossGetDamage() {
        if (this instanceof Endboss) {
            this.animateImages(this.ENDBOSS_IMAGES_HURT);
        }
    }
}