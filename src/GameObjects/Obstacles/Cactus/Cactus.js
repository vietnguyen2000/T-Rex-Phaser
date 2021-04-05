import imageName from '../../../constant/imageName'
import Obstacle from '../Obstacle'

export default class Cactus extends Obstacle {
  constructor (scene, x = 650, y = 140) {
    super(scene, x, y, imageName.Cactus)
    this.initCactus()
  }

  initCactus () {
    this.setOrigin(0.5, 1)
    this.currentFrame = Math.floor(Math.random() * 5)
    this.setTexture(imageName.cactus, this.currentFrame)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.body.setGravity(0, 0)
    this.body.setSize(this.width, this.height)
    this.speed = 300
    this.setSpeed(this.speed)
  }

  getPixel (x, y) {
    return this.scene.textures.getPixel(x, y, this.texture.key, this.currentFrame)
  }
}
