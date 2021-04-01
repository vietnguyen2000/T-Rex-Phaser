import State from "./State";
import animationName from '../../../constant/animationName';
export default class FallState extends State{
    constructor(dinosaur) {
        super(dinosaur);
        this.boost = false;
        this.land = 140;
    }
    down() {
        this.dinosaur.body.setVelocityY(500);
        this.boost = true;

        
    }
    notDown() {
        if (this.boost) {
            this.dinosaur.body.setVelocityY(200);
            this.boost = false;
        }
    }
    default() {
        if (this.dinosaur.body.velocity.y <= 0.5) {
            
            this.dinosaur.state = this.dinosaur.states.run;
        }
    }
}