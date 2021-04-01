import MyGameObject from './MyGameObject';
import imageName from '../constant/imageName';
import animationName from '../constant/animationName';
import groundImage from '../assets/Ground/Ground.png'

class Ground extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, imageName.ground);
        this.initGround(scene);
    }
    initGround(scene) {
        this.setOrigin(0.5,1);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(0);
        this.body.setOffset(0,15);
    }
    static preload(scene) {
        scene.load.image(imageName.ground, groundImage);
    }
}

export default Ground;