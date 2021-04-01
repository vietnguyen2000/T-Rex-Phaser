import MyGameObject from '../MyGameObject';
import imageName from '../../constant/imageName';
import animationName from '../../constant/animationName';

import RunState from './DinosaurState/RunState';
import JumpState from './DinosaurState/JumpState';
import IdleState from './DinosaurState/IdleState';
import FallState from './DinosaurState/FallState';
import DieState from './DinosaurState/DieState';

class Dinosaur extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, imageName.dinosaur);
        this.initAnimation();
        this.initDinosaur();
        
    }
    initDinosaur() {
        this.setOrigin(0.5,1);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(1000);
        this.play(animationName.DinoSaurAnimation.run, true);
        this.body.setSize(this.width,this.height);

        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.states = {
            run: new RunState(this),
            jump: new JumpState(this),
            idle: new IdleState(this),
            fall: new FallState(this),
            die: new DieState(this)
        }
        this.state = this.states.idle;
    }

    initAnimation() {
        let config_animation = {
            key: animationName.DinoSaurAnimation.run,
            frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, {start:2, end: 3, first:0}),
            frameRate: 12,
            repeat: -1,
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
        this.body.setVelocityY(-300);
        this.play(animationName.DinoSaurAnimation.jump, true);
    }
    

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.body.setSize(this.width,this.height);
    }
    update(time, delta) {
        this.state.default();
        if (this.keyUp.isDown) {
            this.state.up();
        }
        else {
            this.state.notUp();
        }
        if(this.keyDown.isDown) {
            this.state.down();
        }
        else {
            this.state.notDown();
        }
    }


}

export default Dinosaur;