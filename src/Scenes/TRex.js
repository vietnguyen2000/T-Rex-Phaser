import Phaser from 'phaser';
import Dinosaur from '../GameObjects/Dinosaur/Dinosaur';
import Ground from '../GameObjects/Ground';
import dinosaur_spritesheet from '../assets/Dinosaur/Dinosaur_44x47x6.png';
import dinosaurCrouch_spritesheet from '../assets/Dinosaur/DinosaurCrouch_59x30x2.png';
import imageName from '../constant/imageName';
import animationName from '../constant/animationName';
import groundImage from '../assets/Ground/Ground.png'

class TRex extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    init() 
    {
      
    }

    preload ()
    {
        this.load.spritesheet(imageName.dinosaur, dinosaur_spritesheet, {frameWidth: 44, frameHeight: 47});
        this.load.spritesheet(imageName.dinosaurCrouch, dinosaurCrouch_spritesheet, {frameWidth: 59, frameHeight: 30});

        this.load.spritesheet(imageName.ground, groundImage, {frameWidth: 2400, frameHeight: 15});
    }
      
    create ()
    {
        this.physics.world.setBounds(0, 0, 600, 140);
        this.dinosaur = new Dinosaur(this, 50, 50);
        this.ground = new Ground(this, 600, 140);

        // this.physics.add.collider(this.dinosaur,this.ground)
        
    }

    update(time, delta) {
        this.dinosaur.update(time, delta);
    }

}

export default TRex;