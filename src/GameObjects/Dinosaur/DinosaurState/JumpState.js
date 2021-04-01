import State from "./State";
import animationName from '../../../constant/animationName';
export default class JumpState extends State{
    constructor(dinosaur) {
        super(dinosaur);
        this.maxHeightBoost = 90;
    }
    up() {
        
        if (this.dinosaur.y > this.maxHeightBoost) {
            this.dinosaur.jump();
        }
    }
    down() {
        this.dinosaur.body.setVelocityY(1);
        this.dinosaur.state = this.dinosaur.states.fall;
    }
    default() {
        
        if (this.dinosaur.body.velocity.y > 0) {
            this.dinosaur.state = this.dinosaur.states.fall;
        }
    }
}