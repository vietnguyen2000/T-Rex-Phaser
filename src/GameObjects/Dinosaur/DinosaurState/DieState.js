import State from "./State";
import animationName from '../../../constant/animationName';
export default class DieState extends State{
    default() {
        this.dinosaur.play(animationName.DinosaurAnimation.die, true);
    }
}