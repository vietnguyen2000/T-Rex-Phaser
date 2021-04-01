import Phaser from 'phaser';
import Dinosaur from '../GameObjects/Dinosaur';
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
        this.dinosaur = new Dinosaur(this, 30, 100);
        this.ground = new Ground(this, 600, 140);

        // this.physics.add.collider(this.dinosaur,this.ground)
        
    }

    update(time, delta) {
    }

    _register(name, typ) {
        Phaser.GameObjects.GameObjectFactory.register(name, function (x, y)
        {
            let gameObject = new typ(this.scene, x, y);
    
            this.displayList.add(gameObject);
            this.updateList.add(gameObject);
    
            return gameObject;
        });
    }

}

export default TRex;