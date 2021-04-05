import Phaser from 'phaser'
import GameOverScene from './Scenes/GameOverScene'
import TRex from './Scenes/TRex'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 600,
  height: 150,
  scene: [TRex, GameOverScene],
  backgroundColor: 0xFFFFFF,
  physics: {
    default: 'arcade'
  }
}

const game = new Phaser.Game(config)
