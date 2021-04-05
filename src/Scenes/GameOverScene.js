import GameOver from '../GameObjects/GameOver/GameOver'
import Replay from '../GameObjects/GameOver/Replay'
import gameOverImage from '../assets/GameOver/GameOver.png'
import replayImage from '../assets/GameOver/Replay.png'
import imageName from '../constant/imageName'
import Phaser from 'phaser'
class GameOverScene extends Phaser.Scene {
  constructor () {
    super({ key: 'gameOver' })
  }

  preload () {
    this.load.image(imageName.gameOver, gameOverImage)
    this.load.image(imageName.replay, replayImage)
  }

  create () {
    this.textures.each((texture) => {
      texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
    })
    this.gameOver = new GameOver(this, 300, 40)
    this.replay = new Replay(this, 300, 90)
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyUp.on('down', (event) => {
      this.scene.sleep('gameOver')
      this.scene.resume('default')
    })
  }
}

export default GameOverScene
