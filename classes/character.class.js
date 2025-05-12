class Character extends MovableObject {

    y = 85;
    width = 90;
    height = 250;
    speed = 4;
    world;

    testOffset = {
        top: 95,
        right: 20,
        left: 20,
        bottom: 5
    };

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

    sleepTimeCounter = 0;
    isDeadCounter = 0;
    napAnimationCounter = 0;
    walkingCounter = 0;

    jumpingCounter = 0;
    isJumping = false;

    constructor() {
        super();
        this.offset = { x: 15, y: 95, width: 30, height: 105 };
        this.loadImages(this.IMAGES_GET_A_NAP);
        this.loadImages(this.IMAGES_FALLING_DOWN);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImage(this.IMAGES_GAME_OVER);
        this.applyGravity();
        this.updateAnimationCharacter();
        this.wasMovingBefore = false;
    }

    /**
     * character get moving, jumping
     */
    updateAnimationCharacter() {
        setStoppableInterval(() => {
            this.characterFallingDown();
            this.ifKeyRight();
            this.ifKeyLeft();
            this.ifJump();
            // this.characterDead();
            // this.characterHurt();
            this.updateCamera();
        }, 20);
    }

    /**
    * character falling down after start the game
    * if character has no moving, hi get a nap
    */
    characterFallingDown() {
        if (this.isAboveGround()) {
            this.animateImages(this.IMAGES_FALLING_DOWN);
        }
        this.ifStanding();
    }

    /**
     * function for sleeping mode, if Character is standing
     */
    ifStanding() {
        if (!this.isAboveGround() && !this.ifKeyLeft() && !this.ifKeyRight()) {
            if (this.wasMovingBefore) {
                this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
                this.wasMovingBefore = false;
            }
            this.sleepTimeCounter++;
            this.walkingCounter = 0;
            this.playNapAnimation();
        } else {
            this.sleepTimeCounter = 0;
            this.napAnimationCounter = 0;
            this.wasMovingBefore = true;
        }
    }

    /**
     * nap animation of character if hi is standing
     */
    playNapAnimation() {
        if (this.sleepTimeCounter > 60) {
            this.napAnimationCounter++;
            if (this.napAnimationCounter % 8 === 0) {
                this.animateImages(this.IMAGES_GET_A_NAP);
            }
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
            this.playWalkAnimation();
            this.otherDirection = false;
            playAudio(walking_sound);
            return true;
        }
        return false;
    }

    /**
     * if it is pressed Key Left
     */
    ifKeyLeft() {
        if (this.world.keyboard.LEFT) {
            if (this.x > -700) {
                this.moveLeft();
            }
            this.playWalkAnimation();
            this.otherDirection = true;
            playAudio(walking_sound);
            return true;
        }
        return false;
    }

    /**
     * walk animation of Character by moving left or right
     */
    playWalkAnimation() {
        this.walkingCounter++;
        if (this.walkingCounter % 8 === 0) {
            this.animateImages(this.IMAGES_WALKING);
        }
    }

    /**
    * for jumping, if Key Space is pressed
    */

    ifJump() {
        if (this.world.keyboard.SPACE) {
            this.isJumping = true;
            this.jumpingCounter++;
            if (!this.isAboveGround()) {
                this.speedY = 30;
            }
            playAudio(jumping_sound);
            this.jumpAnimation();
        }
    }

    jumpAnimation() {
        console.log(this.jumpingCounter);

        if (this.jumpingCounter % 8 === 0) {
            this.animateImages(this.IMAGES_JUMPING);
        }
        if (!this.isAboveGround()) {
            this.isJumping = false;
            this.jumpingCounter = 0;
        }
    }

    // ifJump() {
    //     if (this.world.keyboard.SPACE) {
    //         if (!this.isAboveGround()) {
    //             this.speedY = 30;
    //         }
    //         this.jumpAnimation();
    //         playAudio(jumping_sound);
    //     }
    // }

    // jumpAnimation() {

    //     this.animateImages(this.IMAGES_JUMPING);
    // }

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