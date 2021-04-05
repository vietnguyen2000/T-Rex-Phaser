import Phaser from 'phaser'
import IMG_NAME from '../../constant/imageName'

export default class Digit extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, frame = 0) {
    super(scene, x, y, IMG_NAME.number, frame)
    this.scene.add.existing(this)
  }

  setNumber (num) {
    this.setTexture(IMG_NAME.number, num)
  }
}
