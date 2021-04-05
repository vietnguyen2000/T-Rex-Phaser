import State from './State'
export default class IdleState extends State {
  up () {
    this.dinosaur.state = this.dinosaur.states.jump
    this.dinosaur.jump()
  }
}
