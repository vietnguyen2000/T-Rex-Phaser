import Digit from "./Digit";
import Score from "./Score";

const numWidth = 10;
export default class HighScore extends Score {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.H = new Digit(scene, numWidth*-5, 0, 10);
        this.I = new Digit(scene, numWidth*-4, 0, 11);
        this.add([this.H, this.I]);
    }
}