import MyGameObject from './MyGameObject';
import imageName from '../constant/imageName';
import animationName from '../constant/animationName';

class Dinosaur extends MyGameObject {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.sprite = this.scene.physics.add.sprite(0,0,imageName.dinosaur)
        this.sprite.setOrigin(0.5,1);
        this.sprite.play(animationName.DinoSaurAnimation.run);
        this.sprite.setGravityY(100)
        this.add(this.sprite)
    }
}

export default Dinosaur;