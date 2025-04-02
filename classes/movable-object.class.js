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
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imagesCache[path];
        this.currentImage++;
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
            return this.y < 190;
        }
    }

    /**
     *  if Character.isColliding(Chicken, Endboss, enemies, coins)
     */
    isColliding(movObj) {
        return this.x + this.width > movObj.x &&
            this.y + this.height > movObj.y &&
            this.x <= movObj.x + movObj.width &&
            this.y < movObj.y + movObj.height;
    }

    /**
    * Character or Endboss energy level after be hitted
    */
    hit() {
        if (this instanceof Character || this instanceof Endboss) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
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
        timepassed = timepassed / 1000; // Difference in sec
        return timepassed < 1; // true will be returned
    }

    /**
     * if enemy hited, it shows images that enemies are damaged
     */
    damaged() {
        if (this instanceof Chicken) {
            this.loadImage('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            this.speed = 0;
        }
        if (this instanceof ChickenSmall) {
            this.animateImages(this.IMAGES_DEAD);
        }
        if (this instanceof Endboss) {
            this.animateImages(this.ENDBOSS_IMAGES_HURT);
        }
    }

    /**
    * shows Endscreen with image "You won"
    */
    showYouWon() {
        document.getElementById('game-over-screen').classList.remove('d-none');
        document.getElementById('you-won-img').src = "assets/img/9_intro_outro_screens/win/won_2.png";
    }
}