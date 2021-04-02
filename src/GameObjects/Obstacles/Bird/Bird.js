import imageName from '../../../constant/imageName';
import animationName from '../../../constant/animationName';
import Obstacle from '../Obstacle';

export default class Bird extends Obstacle {
    constructor(scene, x = 650, y = 140) {
        super(scene, x, y, imageName.bird);
        this.initAnimation();
        this.initCactus();
    }
    initAnimation() {
        let config_animation = {
            key: animationName.BirdAnimation.fly,
            frames: this.scene.anims.generateFrameNames(imageName.bird, {start: 0, end: 1, first:0}),
            frameRate: 8,
            repeat: -1,
        }
        this.scene.anims.create(config_animation);
    }
    initCactus() {
        this.setOrigin(0.5,1);
        this.play(animationName.BirdAnimation.fly)
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setGravity(0,0);
        this.body.setSize(this.width,this.height);
        this.speed = 300;
        this.setSpeed(this.speed);
    }
}