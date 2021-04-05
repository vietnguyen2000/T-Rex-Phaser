import Phaser from 'phaser'
import imageName from '../../constant/imageName'
import animationName from '../../constant/animationName'
import audioName from '../../constant/audioName'
import RunState from './DinosaurState/RunState'
import JumpState from './DinosaurState/JumpState'
import IdleState from './DinosaurState/IdleState'
import FallState from './DinosaurState/FallState'
import DieState from './DinosaurState/DieState'

class Dinosaur extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, imageName.dinosaur)
    this.defaultX = x
    this.defaultY = y
    this.initAnimation()
    this.initDinosaur()
  }

  initDinosaur () {
    this.setOrigin(0.5, 1)
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.body.setCollideWorldBounds(true)
    this.body.setGravityY(1000)
    this.play(animationName.DinosaurAnimation.run, true)
    this.body.setSize(this.width, this.height)

    this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)

    this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.states = {
      run: new RunState(this),
      jump: new JumpState(this),
      idle: new IdleState(this),
      fall: new FallState(this),
      die: new DieState(this)
    }
    this.state = this.states.run

    this.jumpSound = this.scene.sound.add(audioName.buttonPress)
  }

  initAnimation () {
    let configAnimation = {
      key: animationName.DinosaurAnimation.run,
      frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, { start: 2, end: 3, first: 0 }),
      frameRate: 12,
      repeat: -1
    }
    this.scene.anims.create(configAnimation)
    configAnimation = {
      key: animationName.DinosaurAnimation.jump,
      frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, { start: 0, end: 0, first: 0 }),
      frameRate: 60
    }
    this.scene.anims.create(configAnimation)
    configAnimation = {
      key: animationName.DinosaurAnimation.die,
      frames: this.scene.anims.generateFrameNumbers(imageName.dinosaur, { start: 4, end: 5, first: 0 }),
      frameRate: 12
    }
    this.scene.anims.create(configAnimation)
    configAnimation = {
      key: animationName.DinosaurAnimation.crouch,
      frames: this.scene.anims.generateFrameNumbers(imageName.dinosaurCrouch, { start: 0, end: 1, first: 0 }),
      frameRate: 12,
      repeat: -1
    }
    this.scene.anims.create(configAnimation)
  }

  reset () {
    this.setX(this.defaultX)
    this.setY(this.defaultY)
    this.state = this.states.run
    this.body.setVelocityY(0)
  }

  jump () {
    this.body.setVelocityY(-300)
    this.play(animationName.DinosaurAnimation.jump, true)
    this.jumpSound.play()
  }

  boostJump () {
    this.body.setVelocityY(-300)
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
    this.body.setSize(this.width, this.height)
  }

  update (time, delta) {
    this.state.default()
    if (this.keyUp.isDown) {
      this.state.up()
    } else {
      this.state.notUp()
    }
    if (this.keyDown.isDown) {
      this.state.down()
    } else {
      this.state.notDown()
    }
  }

  getPixel (x, y) {
    return this.scene.textures.getPixel(x, y, this.texture.key, this.anims.currentFrame.frame.sourceIndex)
  }
}

export default Dinosaur
