import Bird from '../Obstacles/Bird/Bird'
import Cactus from '../Obstacles/Cactus/Cactus'
import audioName from '../../constant/audioName'
export default class GameManager {
  constructor (scene, obj) {
    this.scene = scene
    this.obj = obj
    this.dinosaur = obj.dinosaur
    this.ground = obj.ground
    this.score = obj.score
    this.highScore = obj.highScore
    this.cactuses = this.scene.add.group({ classType: Cactus, defaultKey: 'cactuses' })
    this.birds = this.scene.add.group({ classType: Bird, defaultKey: 'cactuses' })
    this.currentObstacle = null
    this.obstacles = []
    this.scene.physics.add.overlap(this.dinosaur, this.cactuses, this.touchOtacles(this))
    this.scene.physics.add.overlap(this.dinosaur, this.birds, this.touchOtacles(this))
    this.baseRate = 1.2
    this.rateGenerate = this.baseRate
    this._currentRate = this.rateGenerate
    this._timeCountGenerate = 0

    this.baseSpeed = 300
    this.currentSpeed = this.baseSpeed
    this._score = 0
    this._highScore = 0

    this.status = 'running'

    this.scene.events.on('resume', this.replay(this))

    this.hitSound = this.scene.sound.add(audioName.hit)
    this.scoreReachedSound = this.scene.sound.add(audioName.scoreReached)
  }

  generateObstacleByTime (delta) {
    this._timeCountGenerate += delta / 1000
    if (this._timeCountGenerate >= this._currentRate) {
      this._timeCountGenerate -= this._currentRate
      this.generateObstacle()
    }
  }

  generateObstacle () {
    if (Math.round(Math.random())) {
      this.generateCactus()
    } else {
      this.generateBird()
    }
    this._currentRate = (Math.random() + 0.5) * this.rateGenerate
  }

  generateCactus () {
    const cactus = this.cactuses.getFirstDead(true, 600, 140)
    this.obstacles.push(cactus)
    cactus.setSpeed(this.currentSpeed)
    this.enable(cactus)
  }

  generateBird () {
    const bird = this.birds.getFirstDead(true, 600, Math.random() * 90 + 50)
    this.obstacles.push(bird)
    bird.setSpeed(this.currentSpeed)
    this.enable(bird)
  }

  gameOver () {
    this.setHighScore()
    this.pauseGame()
    this.scene.scene.wake('gameOver')
  }

  pauseGame () {
    this.scene.scene.pause()
    this.status = 'pause'
  }

  replay () {
    return () => {
      this.setScore(0)
      this.obstacles.forEach(this.disable)
      this.disable(this.currentObstacle)
      this.currentObstacle = null
      this.obstacles = []
      this.dinosaur.reset()
      this.status = 'running'
    }
  }

  updateScore (delta) {
    if (this.status === 'running') {
      this.setScore(this._score + delta / 100)
    }
  }

  setScore (score) {
    // console.log(Math.ceil(this._score/10), Math.ceil(score/10))
    if (Math.ceil(this._score / 100) === Math.floor(score / 100)) {
      this.scoreReachedSound.play()
    }
    this._score = Number(score)
    this.score.setScore(Math.floor(this._score))
  }

  setHighScore () {
    this._highScore = Math.max(this._highScore, this._score)
    this.highScore.setScore(Math.floor(this._highScore))
  }

  touchOtacles () {
    return (col1, col2) => {
      if (this.checkOverlapPixel(col1, col2)) {
        this.hitSound.play()
        this.gameOver()
        this.dinosaur.state = this.dinosaur.states.die
      }
    }
  }

  checkOverlapPixel (col1, col2) {
    const rect1 = {
      x: col1.x,
      y: col1.y,
      width: col1.width,
      height: col1.height
    }
    const rect2 = {
      x: col2.x,
      y: col2.y,
      width: col2.width,
      height: col2.height
    }
    const iMin = Math.floor(Math.max(rect1.x, rect2.x))
    const iMax = Math.floor(Math.min(rect1.x + rect1.width, rect2.x + rect2.width))
    const jMin = Math.floor(Math.max(rect1.y, rect2.y))
    const jMax = Math.floor(Math.min(rect1.y + rect1.height, rect2.y + rect2.height))
    for (let i = iMin + 1; i < iMax; i++) {
      for (let j = jMin + 1;
        j < jMax;
        j++) {
        if (!this.isTransparent(col1.getPixel(i - rect1.x, j - rect1.y)) &&
                    !this.isTransparent(col2.getPixel(i - rect2.x, j - rect2.y))) {
          return true
        }
      }
    }
    return false
  }

  isTransparent (color) {
    if (color.a === 0) return true
    if (color.r < 150 && color.g < 150 && color.b < 150) return false
    return true
  }

  update (time, delta) {
    this.updateScore(delta)
    this.generateObstacleByTime(delta)
    if (this.currentObstacle != null) {
      if (this.currentObstacle.x < -10) {
        this.disable(this.currentObstacle)
        this.getNewCurrentObstacles()
      }
    } else {
      this.getNewCurrentObstacles()
    }
  }

  updateSpeed () {
    this.currentSpeed = (this._score / 10 + 1) * this.baseSpeed
    this.rateGenerate = (this._score / 10 + 1) * this.baseRate
  }

  getNewCurrentObstacles () {
    if (this.obstacles.length > 0) {
      this.currentObstacle = this.obstacles.shift()
    } else {
      this.currentObstacle = null
    }
    return this.currentObstacle
  }

  disable (obstacle) {
    obstacle.setActive(false).setVisible(false)
    obstacle.body.enable = false
  }

  enable (obstacle) {
    obstacle.setActive(true).setVisible(true)
    obstacle.body.enable = true
    obstacle.setSpeed(this.currentSpeed)
  }
}
