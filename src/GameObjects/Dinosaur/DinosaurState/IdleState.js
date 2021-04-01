import State from "./State";
import animationName from '../../../constant/animationName';
export default class IdleState extends State{
    up() {
        this.dinosaur.state = this.dinosaur.states.jump;
        this.dinosaur.jump();
    }
}