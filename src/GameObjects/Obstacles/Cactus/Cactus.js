import imageName from '../../../constant/imageName';
import animationName from '../../../constant/animationName';

export default class Cactus extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 650, y = 140) {
        super(scene, x, y, imageName.Cactus);
        this.initCactus();
    }
    initCactus() {
        this.setOrigin(0.5,1);
        this.setTexture(imageName.cactus,Math.floor(Math.random()*5))
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setGravity(0,0);
        this.body.setSize(this.width,this.height);
        this.speed = 300
        this.setSpeed(this.speed)
    }
    setSpeed(speed) {
        this.body.setVelocityX(-speed);
    }
}