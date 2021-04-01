import MyGameObject from './MyGameObject';
import imageName from '../constant/imageName';
import animationName from '../constant/animationName';
import dinosaur_spritesheet from '../assets/Dinosaur/Dinosaur_44x47x6.png';
import dinosaurCrouch_spritesheet from '../assets/Dinosaur/DinosaurCrouch_59x30x2.png';

class Dinosaur extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, imageName.dinosaur);
        this.initAnimation();
        this.initDinosaur(scene);
        
    }
    initDinosaur(scene) {
        this.setOrigin(0.5,1);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(100);
        this.play(animationName.DinoSaurAnimation.run);
        this.body.setSize(this.width,this.height);

    }
    static preload(scene) {
        scene.load.spritesheet(imageName.dinosaur, dinosaur_spritesheet, {frameWidth: 44, frameHeight: 47});
        scene.load.spritesheet(imageName.dinosaurCrouch, dinosaurCrouch_spritesheet, {frameWidth: 59, frameHeight: 30});
    }

    initAnimation() {
        let config_animation = {
            key: animationName.DinoSaurAnimation.run,
            frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, {start:2, end: 3, first:0}),
            frameRate: 12,
            repeat: -1
        }
        this.scene.anims.create(config_animation);
        config_animation = {
            key: animationName.DinoSaurAnimation.jump,
            frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, {start:0, end: 0, first:0}),
            frameRate: 60,
        }
        this.scene.anims.create(config_animation);
        config_animation = {
            key: animationName.DinoSaurAnimation.die,
            frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, {start:4, end: 5, first:0}),
            frameRate: 12,
        }
        this.scene.anims.create(config_animation);
        config_animation = {
            key: animationName.DinoSaurAnimation.crouch,
            frames: this.scene.anims.generateFrameNumbers(imageName.dinosaurCrouch, {start:0, end: 1, first:0}),
            frameRate: 12,
            repeat: -1
        }
        this.scene.anims.create(config_animation);
    }

    jump() {

    }

    boostDown() {

    }

    
}

export default Dinosaur;