import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import IMG_NAME from '../constant/imageName';
import MyGameObject from '../GameObjects/MyGameObject';
class TRex extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image(IMG_NAME.LOGO, logoImg);
    }
      
    create ()
    {
        this.t = new MyGameObject(this, {x:400,y:150});
    }
}

export default TRex;