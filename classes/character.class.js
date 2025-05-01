class Character extends MovableObject {

    y = 85;
    width = 90;
    height = 250;
    speed = 14;

    world;

    IMAGES_GET_A_NAP = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_FALLING_DOWN = [
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/1_idle/idle/I-1.png'
    ];

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png'
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'

    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_GAME_OVER = [
        'assets/img/9_intro_outro_screens/game_over/game over!.png'
    ];

    frameCount = 0;
    frameSkip = 3;
    sleepTimeCounter = 0;
    isDeadCounter = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_GET_A_NAP);
        this.loadImages(this.IMAGES_FALLING_DOWN);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImage(this.IMAGES_GAME_OVER);
        this.applyGravity();
    }

    /**
     * character get moving, jumping
     */
    updateAnimationCharacter() {
        this.frameCount++;
        if (this.frameCount >= this.frameSkip) {
            this.characterFallingDown();
            this.ifKeyRight();
            this.ifKeyLeft();
            this.ifJump();
            this.characterDead();
            this.characterHurt();
            this.frameCount = 0;
        }
        this.updateCamera();
        this.sleepTimeCounterChecking();
    }

    /**
     * controls the use of key buttons and controls the sleepTimeCounter
     * that will be needed for ifStanding().
     */
    sleepTimeCounterChecking() {
        const noKeyPressed = !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT
            && !this.world.keyboard.SPACE && !this.world.keyboard.D;
        if (noKeyPressed) {
            if (this.sleepTimeCounter === 0) {
                this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
            }
            this.sleepTimeCounter++;
        } else {
            this.sleepTimeCounter = 0;
        }
    }

    /**
    * character falling down after start the game
    * if character has no moving, hi get a nap
    */
    characterFallingDown() {
        if (this.isAboveGround()) {
            this.animateImagesOnce(this.IMAGES_FALLING_DOWN);
        }
        this.ifStanding();
    }

    /**
     * function for sleeping mode, if Character is standing
     */
    ifStanding() {
        if (!this.isAboveGround() && this.sleepTimeCounter > 60) {
            this.animateImages(this.IMAGES_GET_A_NAP);
        }
    }

    /**
     * if it is pressed Key Right
     */
    ifKeyRight() {
        if (this.world.keyboard.RIGHT) {
            if (this.x < 2340) {
                this.moveRight();
            }
            this.animateImages(this.IMAGES_WALKING);
            this.otherDirection = false;
            walking_sound.play();
        }
    }

    /**
     * if it is pressed Key Left
     */
    ifKeyLeft() {
        if (this.world.keyboard.LEFT) {
            if (this.x > -700) {
                this.moveLeft();
            }
            this.animateImages(this.IMAGES_WALKING);
            this.otherDirection = true;
            walking_sound.play();
        }
    }

    /**
    * for jumping, if Key Space is pressed
    */
    ifJump() {
        if (this.world.keyboard.SPACE) {
            if (!this.isAboveGround()) {
                this.speedY = 30;
            }
            this.animateImages(this.IMAGES_JUMPING);
            jumping_sound.play();
        }
    }

    /**
    * character get hurt - Chicken, Endboss collision.
    */
    characterHurt() {
        if (this.isHurt()) {
            playAudio(getPain);
            this.animateImages(this.IMAGES_HURT);
        }
    }

    /**
     * in case if character is dead, game over.
     */
    characterDead() {
        if (this.isDead()) {
            this.speed = 0;
            this.isDeadCounter++;
            this.animateImages(this.IMAGES_DEAD);
            if (this.isDeadCounter === 60) {
                showYouLost();
            }
        }
    }

    /**
     * position of character on the screen at the game start
     */
    updateCamera() {
        this.world.camera_x = -this.x + 280;
    }
}