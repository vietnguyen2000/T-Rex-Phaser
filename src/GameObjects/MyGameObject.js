import phaser from 'phaser';
import IMG_NAME from '../constant/imageName';
const Mathf = Phaser.Math
class MyGameObject extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y);
    }
    preUpdate(time, delta){}
}


export default MyGameObject;