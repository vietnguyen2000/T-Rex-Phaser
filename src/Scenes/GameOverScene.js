import GameOver from '../GameObjects/GameOver/GameOver';
import Replay from '../GameObjects/GameOver/Replay';
import gameOver_image from '../assets/GameOver/GameOver.png';
import replay_image from '../assets/GameOver/Replay.png';
import imageName from '../constant/imageName';
import Phaser from 'phaser';
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({key: 'gameOver'})
    }
    preload() {
        console.log('gameover preload')
        this.load.image(imageName.gameOver, gameOver_image);
        this.load.image(imageName.replay, replay_image);
        
    }
    create() {
        this.gameOver = new GameOver(this, 300, 40);
        this.replay = new Replay(this, 300, 90);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.keyUp.on('down', (event) => {
            this.scene.sleep('gameOver');
            this.scene.resume('default');
        })
    }
}

export default GameOverScene;