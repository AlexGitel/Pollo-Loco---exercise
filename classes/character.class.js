class Character extends MovableObject {

    y = 85;
    width = 90;
    height = 250;
    speed = 7;
    world;

    saveOffset = {
        top: 95,
        right: 20,
        left: 20,
        bottom: 5
    };

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

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
        'assets/img/2_character_pepe/3_jump/J-37.png'
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
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
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

    wasWalking = false;
    fallCounter = 0;
    inactiveState = 0;
    idleAnimationCounter = 0;
    sleepTimeCounter = 0;
    napAnimationCounter = 0;
    walkAnimationCounter = 0;
    jumpAnimationCounter = 0;
    isDeadCounter = 0;
    deadAnimationCounter = 0;
    fallingDown = true;
    wasInAir = false;

    constructor() {
        super();
        this.loadImages(this.IMAGES_FALLING_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_GET_A_NAP);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImage(this.IMAGES_GAME_OVER);
        this.applyGravity();
        this.characterFallingDown();
        this.updateAnimationCharacter();
    }

    /**
     * character get moving, jumping
     */
    updateAnimationCharacter() {
        setStoppableInterval(() => {
            this.stopWalkingAnimation();
            this.ifStanding();
            this.ifKeyRight();
            this.ifKeyLeft();
            this.ifJump();
            this.jumpAnimation();
            this.characterHurt();
            this.updateCamera();
        }, 20);
    }

    /**
    * character falling down after start the game
    * if character has no moving, hi get a nap
    */
    characterFallingDown() {
        let fallingDown = setInterval(() => {
            if (this.isAboveGround()) {
                this.animateImages(this.IMAGES_FALLING_DOWN);
            }
            if (!this.isAboveGround()) {
                this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
                clearInterval(fallingDown);
                this.fallingDown = false;
            }
        }, 260);
    }

    /**
     * function for sleeping mode, if Character is standing
     */
    ifStanding() {
        let noKeyPressed = !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D;
        if (!this.isAboveGround() && noKeyPressed && !this.isDead()) {
            this.walkAnimationCounter = 0;
            this.inactiveState++;
            this.playIdleAnimation();
            this.sleepTimeCounter++;
        }
        else {
            this.sleepTimeCounter = 0;
            this.napAnimationCounter = 0;
            this.inactiveState = 0;
        }
    }

    /**
    * idle animation after inactive state
    */
    playIdleAnimation() {
        if (this.inactiveState >= 40) {
            this.idleAnimationCounter++;
            if (this.idleAnimationCounter % 13 === 0) {
                this.animateImages(this.IMAGES_IDLE);
            }
        }
        if (this.sleepTimeCounter >= 200) {
            this.inactiveState = 0;
            this.idleAnimationCounter = 0;
            this.playNapAnimation();
        }
    }

    /**
    * nap animation of character if hi is standing
    */
    playNapAnimation() {
        this.napAnimationCounter++;
        if (this.napAnimationCounter % 8 === 0) {
            this.animateImages(this.IMAGES_GET_A_NAP);
        }
    }

    /**
    * if it is pressed Key Right
    */
    ifKeyRight() {
        if (this.world.keyboard.RIGHT) {
            this.walkAnimationCounter++;
            if (this.x < 2340) {
                this.moveRight();
            }
            this.otherDirection = false;
            this.playWalkAnimation();
            playAudio(walking_sound);
        }
    }

    /**
     * if it is pressed Key Left
     */
    ifKeyLeft() {
        if (this.world.keyboard.LEFT) {
            this.walkAnimationCounter++;
            if (this.x > -700) {
                this.moveLeft();
            }
            this.otherDirection = true;
            this.playWalkAnimation();
            playAudio(walking_sound);
        }
    }

    /**
     * walk animation of Character by moving left or right
     */
    playWalkAnimation() {
        if (!this.isAboveGround() && this.walkAnimationCounter % 4 === 1) {
            this.animateImages(this.IMAGES_WALKING);
        }
    }

    /**
     * function to show stand image after walking
     */
    stopWalkingAnimation() {
        let noKeyPressed = !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
        if (this.wasWalking && noKeyPressed && !this.isAboveGround()) {
            this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
            this.wasWalking = false;
        }
        if (!noKeyPressed) {
            this.wasWalking = true;
        }
    }

    /**
    * for jumping, if Key Space is pressed
    */
    ifJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.sleepTimeCounter = 0;
            this.napAnimationCounter = 0;
            this.speedY = 30;
            playAudio(jumping_sound);
        }
    }

    /**
     * jump animation if character is above ground (jumping)
     */
    jumpAnimation() {
        if (this.isAboveGround()) {
            this.wasInAir = true;
            if (this.jumpAnimationCounter % 5 === 0) {
                const frameIndex = Math.floor(this.jumpAnimationCounter / 5) % this.IMAGES_JUMPING.length;
                this.loadImage(this.IMAGES_JUMPING[frameIndex]);
            }
            this.jumpAnimationCounter++;
        } else {
            if (this.wasInAir) {
                this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
                this.wasInAir = false;
            }
            this.jumpAnimationCounter = 0;
        }
    }

    /**
    * character get hurt after collision with Chicken, Endboss, than dead
    */
    characterHurt() {
        if (this.isHurt() && !this.isDead()) {
            playAudio(getPain);
            this.animateImages(this.IMAGES_HURT);
        }
        if (this.isDead()) {
            this.deadAnimationCounter++;
            this.isDeadCounter++;
            this.deadAnimation();
        }
    }

    /**
    * if character dead, play dead animation
    */
    deadAnimation() {
        stopAudio(getPain);
        this.speed = 0;
        if (this.deadAnimationCounter % 3 === 0) {
            this.animateImages(this.IMAGES_DEAD);
        }
        if (this.isDeadCounter === 120) {
            this.deadAnimationCounter = 0;
            this.isDeadCounter = 0;
            showYouLost();
        }
    }

    /**
     * position of character on the screen at the game start
     */
    updateCamera() {
        this.world.camera_x = -this.x + 280;
    }
}