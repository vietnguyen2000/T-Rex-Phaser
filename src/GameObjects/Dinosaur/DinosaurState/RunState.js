import State from './State'
import animationName from '../../../constant/animationName'
export default class RunState extends State {
  up () {
    this.dinosaur.state = this.dinosaur.states.jump
    this.dinosaur.jump()
  }

  down () {
    this.dinosaur.play(animationName.DinosaurAnimation.crouch, true)
  }

  notDown () {
    this.dinosaur.play(animationName.DinosaurAnimation.run, true)
  }
}
