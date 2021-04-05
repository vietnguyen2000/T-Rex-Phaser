import Phaser from 'phaser'
import Dinosaur from '../GameObjects/Dinosaur/Dinosaur'
import Ground from '../GameObjects/Ground/Ground'
import GameManager from '../GameObjects/GameManager/GameManager'
import dinosaurSpritesheet from '../assets/Dinosaur/Dinosaur_44x47x6.png'
import dinosaurCrouchSpritesheet from '../assets/Dinosaur/DinosaurCrouch_59x30x2.png'
import imageName from '../constant/imageName'
import audioName from '../constant/audioName'
import groundImage from '../assets/Ground/Ground.png'
import cactusSpritesheet from '../assets/Cactus/Cactus_25x52x5.png'
import birdSpritesheet from '../assets/Bird/Bird_46x40x2.png'
import numberSpritesheet from '../assets/Number/Number_9x11x11.png'
import Score from '../GameObjects/Number/Score'
import HighScore from '../GameObjects/Number/HighScore'
import LoadingScreen from './LoadingScreen'
import CloudImage from '../assets/Cloud/Cloud.png'
import Cloud from '../GameObjects/Cloud/Cloud'
import buttonPressSound from '../assets/Sound/button-press.mp3'
import hitSound from '../assets/Sound/hit.mp3'
import scoreReached from '../assets/Sound/score-reached.mp3'
class TRex extends Phaser.Scene {
  constructor () {
    super({ key: 'default' })
  }

  init () {
  }

  preload () {
    this.load.spritesheet(imageName.dinosaur, dinosaurSpritesheet, { frameWidth: 44, frameHeight: 47 })
    this.load.spritesheet(imageName.dinosaurCrouch, dinosaurCrouchSpritesheet, { frameWidth: 59, frameHeight: 30 })

    this.load.spritesheet(imageName.ground, groundImage, { frameWidth: 2400, frameHeight: 15 })

    this.load.spritesheet(imageName.cactus, cactusSpritesheet, { frameWidth: 25, frameHeight: 52 })
    this.load.spritesheet(imageName.bird, birdSpritesheet, { frameWidth: 46, frameHeight: 40 })

    this.load.spritesheet(imageName.number, numberSpritesheet, { frameWidth: 9, frameHeight: 11 })

    this.load.image(imageName.cloud, CloudImage)

    this.load.audio(audioName.buttonPress, buttonPressSound)
    this.load.audio(audioName.hit, hitSound)
    this.load.audio(audioName.scoreReached, scoreReached)

    // for (let i = 0; i < 100; i++) {
    //   this.load.image('logo' + i, './src/assets/logo.png')
    // }

    const loadingScreen = new LoadingScreen(this)
    this.load.on('progress', loadingScreen.progress(loadingScreen))
    this.load.on('complete', loadingScreen.complete(loadingScreen))
  }

  create () {
    const cloud1 = new Cloud(this, 650, 40, 15)
    const cloud2 = new Cloud(this, 600, 60, 20)
    const cloud3 = new Cloud(this, 700, 80, 10)

    this.textures.each((texture) => {
      texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
    })
    this.physics.world.setBounds(0, 0, 600, 140)
    this.dinosaur = new Dinosaur(this, 50, 140)
    this.ground = new Ground(this, 600, 140)
    this.score = new Score(this, 550, 20)
    this.highScore = new HighScore(this, 490, 20)

    this.scene.launch('gameOver')
    this.scene.sleep('gameOver')

    this.gameManager = new GameManager(this, { dinosaur: this.dinosaur, ground: this.ground, score: this.score, highScore: this.highScore })
  }

  update (time, delta) {
    this.dinosaur.update(time, delta)
    this.gameManager.update(time, delta)
  }
}

export default TRex
