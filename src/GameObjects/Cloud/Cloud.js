import Phaser from 'phaser'
import IMG_NAME from '../../constant/imageName'

export default class Cloud extends Phaser.GameObjects.Image {
  constructor (scene, x, y, velocity) {
    super(scene, x, y, IMG_NAME.cloud)
    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)
    this.body.setVelocityX(-velocity)
  }

  preUpdate (time, delta) {
    if (this.x < -50) {
      this.setX(650)
    }
  }
}
