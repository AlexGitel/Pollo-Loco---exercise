class Character extends MovableObject {

    y = 85;
    width = 90;
    height = 250;
    speed = 14;

    IMAGES_FALLING_DOWN = [
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',
        'assets/img/2_character_pepe/3_jump/J-31.png'
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
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-31.png'
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

    world;

    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/juhu.mp3');
    getPain = new Audio('audio/pain.mp3');

    constructor() {
        super().loadImage('assets/img/2_character_pepe/3_jump/J-35.png');
        this.loadImages(this.IMAGES_FALLING_DOWN);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImage(this.IMAGES_GAME_OVER);
        this.applyGravity();
        this.animateCharacter();
    }

    /**
     * character get moving, jumping
     */
    animateCharacter() {
        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < 2340) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -700) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.loadImage('assets/img/2_character_pepe/3_jump/J-31.png');
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 280;
        }, 1000 / 25);


        /**
         * checks the situation and shows the correct images
         */
        setStoppableInterval(() => {
            if (this.isDead()) {
                you_lost.play();
                this.animateImages(this.IMAGES_DEAD);
                showYouLost();

            } else if (this.isHurt()) {
                this.animateImages(this.IMAGES_HURT);
                this.getPain.play();

            } else if (this.isAboveGround()) {
                this.animateImages(this.IMAGES_FALLING_DOWN);

            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.animateImages(this.IMAGES_WALKING);
                }
            }
        }, 40);
    }

    /**
     * for jumping
     */
    jump() {
        this.speedY = 30;
    }
}