import phaser from 'phaser';
import IMG_NAME from '../constant/imageName';
const Mathf = Phaser.Math
class MyGameObject {
    constructor(scene, pos = new Mathf.Vector2(0,0)) {
        this.scene = scene;
        this.defaultPos = pos;
        const logo = this.scene.add.image(pos.x, pos.y, IMG_NAME.LOGO);
      
        this.scene.tweens.add({
            targets: logo,
            y: 150,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

export default MyGameObject;