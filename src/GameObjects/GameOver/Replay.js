import imageName from '../../constant/imageName';
export default class Replay extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, imageName.replay);
        scene.add.existing(this);
    }
}