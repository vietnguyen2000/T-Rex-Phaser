import Phaser from 'phaser';
import Dinosaur from '../GameObjects/Dinosaur/Dinosaur';
import Ground from '../GameObjects/Ground/Ground';
import GameManager from '../GameObjects/GameManager/GameManager';
import dinosaur_spritesheet from '../assets/Dinosaur/Dinosaur_44x47x6.png';
import dinosaurCrouch_spritesheet from '../assets/Dinosaur/DinosaurCrouch_59x30x2.png';
import imageName from '../constant/imageName';
import animationName from '../constant/animationName';
import groundImage from '../assets/Ground/Ground.png';
import cactus_spritesheet from '../assets/Cactus/Cactus_25x52x5.png';
import bird_spritesheet from '../assets/Bird/Bird_46x40x2.png';
import number_spritesheet from '../assets/Number/Number_9x11x11.png';
import Score from '../GameObjects/Number/Score';
import HighScore from '../GameObjects/Number/HighScore';
import LoadingScreen from './LoadingScreen';


class TRex extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'default'});
    }

    init() 
    {
    }

    preload ()
    {
        this.load.spritesheet(imageName.dinosaur, dinosaur_spritesheet, {frameWidth: 44, frameHeight: 47});
        this.load.spritesheet(imageName.dinosaurCrouch, dinosaurCrouch_spritesheet, {frameWidth: 59, frameHeight: 30});

        this.load.spritesheet(imageName.ground, groundImage, {frameWidth: 2400, frameHeight: 15});

        this.load.spritesheet(imageName.cactus, cactus_spritesheet, {frameWidth: 25, frameHeight: 52})
        this.load.spritesheet(imageName.bird, bird_spritesheet, {frameWidth: 46, frameHeight:40})

        this.load.spritesheet(imageName.number, number_spritesheet, {frameWidth: 9, frameHeight: 11})

        for (var i = 0; i < 100; i++) {
            this.load.image('logo'+i, './src/assets/logo.png');
        }

        let loadingScreen = new LoadingScreen(this);
        this.load.on('progress', loadingScreen.progress(loadingScreen));
        this.load.on('complete', loadingScreen.complete(loadingScreen));

    }
      
    create ()
    {
        
        this.textures.each((texture) => {

            texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        })
        this.physics.world.setBounds(0, 0, 600, 140);
        this.dinosaur = new Dinosaur(this, 50, 140);
        this.ground = new Ground(this, 600, 140);
        this.score = new Score(this, 550, 20);
        this.highScore = new HighScore(this, 490, 20);

        this.scene.launch('gameOver');
        this.scene.sleep('gameOver');
        
        this.gameManager = new GameManager(this, {dinosaur: this.dinosaur, ground: this.ground, score: this.score, highScore: this.highScore})
        // this.physics.add.collider(this.dinosaur,this.ground)

        
        
    }

    update(time, delta) {
        this.dinosaur.update(time, delta);
        this.gameManager.update(time, delta);
    }

}

export default TRex;