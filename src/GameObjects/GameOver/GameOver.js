import imageName from '../../constant/imageName';
export default class GameOver extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, imageName.gameOver);
        scene.add.existing(this);
    }
}