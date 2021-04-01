import Phaser from 'phaser';
import dinosaur_spritesheet from '../assets/Dinosaur/Dinosaur_44x47x6.png';
import dinosaurCrouch_spritesheet from '../assets/Dinosaur/DinosaurCrouch_59x30x2.png';
import animationName from '../constant/animationName';
import imageName from '../constant/imageName';
import Dinosaur from '../GameObjects/Dinosaur';
class TRex extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    init() 
    {
        Phaser.GameObjects.GameObjectFactory.register('dinosaur', function (x, y)
        {
            let dinosaur = new Dinosaur(this.scene, x, y);
    
            this.displayList.add(dinosaur);
            this.updateList.add(dinosaur);
    
            return dinosaur;
        });
    }

    preload ()
    {
        this.load.spritesheet(imageName.dinosaur, dinosaur_spritesheet, {frameWidth: 44, frameHeight: 47});
        this.load.spritesheet(imageName.dinosaurCrouch, dinosaurCrouch_spritesheet, {frameWidth: 59, frameHeight: 30});
    }
      
    create ()
    {
        this._prepareAnimation();
        this.add.dinosaur(50, 130);
    }

    _prepareAnimation() {

        // Dinosaur

        let config_animation = {
            key: animationName.DinoSaurAnimation.run,
            frames: this.anims.generateFrameNumbers(imageName.dinosaur, {start:2, end: 3, first:0}),
            frameRate: 12,
            repeat: -1
        }
        this.anims.create(config_animation);
        config_animation = {
            key: animationName.DinoSaurAnimation.jump,
            frames: this.anims.generateFrameNumbers(imageName.dinosaur, {start:0, end: 0, first:0}),
            frameRate: 60,
        }
        this.anims.create(config_animation);
        config_animation = {
            key: animationName.DinoSaurAnimation.die,
            frames: this.anims.generateFrameNumbers(imageName.dinosaur, {start:4, end: 5, first:0}),
            frameRate: 12,
        }
        this.anims.create(config_animation);
        config_animation = {
            key: animationName.DinoSaurAnimation.crouch,
            frames: this.anims.generateFrameNumbers(imageName.dinosaurCrouch, {start:0, end: 1, first:0}),
            frameRate: 12,
            repeat: -1
        }
        this.anims.create(config_animation);
    }
}

export default TRex;