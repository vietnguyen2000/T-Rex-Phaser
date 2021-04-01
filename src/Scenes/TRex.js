import Phaser from 'phaser';
import Dinosaur from '../GameObjects/Dinosaur/Dinosaur';
import Ground from '../GameObjects/Ground';
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
        Dinosaur.preload(this)
        Ground.preload(this)
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