import MyGameObject from './MyGameObject';
import imageName from '../constant/imageName';
import animationName from '../constant/animationName';
import groundImage from '../assets/Ground/Ground.png'

class Ground extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, imageName.ground);
        this.initGround(scene);
    }
    initGround(scene) {
        this.setOrigin(0.5,1);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        // this.body.setCollideWorldBounds(true);
        this.body.setGravityY(0);
        this.body.setSize(0,0)
        this.body.setOffset(0,15);
        this.speed = 300;
        this.setSpeedX(this.speed);
    }
    static preload(scene) {
        scene.load.spritesheet(imageName.ground, groundImage, {frameWidth: 2400, frameHeight: 15});
    }
    setSpeedX(speed) {
        this.body.setVelocityX(-speed);
        this.speed = speed;
    }

    preUpdate(time, delta) {
        if (this.x <= -600) this.setX(this.x+=1200);
    }

}

export default Ground;