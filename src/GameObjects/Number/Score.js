import Digit from "./Digit";

const numWidth = 10;
export default class Score extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y);
        this.digits = []
        for (let i = 0; i < 5; i++) {
            this.digits.push(new Digit(scene, numWidth*(i-2) , 0));
        }
        this.add(this.digits)
        this.score = 0
        this.scene.add.existing(this)
    }
    setScore(score) {
        this.score = Number(score);
        let scoreStr = this.FormatNumberLength(score, 5);
        for (let i = 0; i < 5; i ++) {
            this.digits[i].setNumber(scoreStr[i])
        }
        
    }
    

    FormatNumberLength(num, length) {
        var r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    }
}