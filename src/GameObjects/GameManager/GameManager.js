import { Time } from "phaser";
import Bird from "../Obstacles/Bird/Bird";
import Cactus from "../Obstacles/Cactus/Cactus";

export default class GameManager {
    constructor(scene, obj) {
        this.scene = scene;
        this.obj = obj;
        this.dinosaur = obj.dinosaur;
        this.ground = obj.ground;
        this.score = obj.score;
        this.highScore = obj.highScore;
        this.cactuses = this.scene.add.group({classType: Cactus, defaultKey: 'cactuses'})
        this.birds = this.scene.add.group({classType: Bird, defaultKey: 'cactuses'})
        this.currentObstacle = null;
        this.obstacles = [];
        this.scene.physics.add.overlap(this.dinosaur,this.cactuses,this.touchOtacles(this))
        this.scene.physics.add.overlap(this.dinosaur,this.birds,this.touchOtacles(this))
        this.rateGenerate = 1.2;
        this._currentRate = this.rateGenerate;
        this._timeCountGenerate = 0;

        this.baseSpeed = 300;
        this.currentSpeed = this.baseSpeed;
        this._score = 0;
        this._highScore = 0;
        this._timeStart = -1;

        this.status = 'running';

        this.scene.events.on('resume', this.replay(this));
    }

    generateObstacleByTime(delta) {
        this._timeCountGenerate += delta/1000;
        if (this._timeCountGenerate >= this._currentRate) {
            this._timeCountGenerate -= this._currentRate;
            this.generateObstacle();
        }
    }

    generateObstacle() {
        if(Math.round(Math.random())) {
            this.generateCactus();
        }
        else {
            this.generateBird();
        }
    }
    generateCactus() {
        let cactus = this.cactuses.getFirstDead(true, 600, 140);
        this.obstacles.push(cactus)
        this.enable(cactus);
    }
    generateBird() {
        let bird = this.birds.getFirstDead(true, 600, Math.random()*90+50);
        this.obstacles.push(bird)
        this.enable(bird);
    }
    gameOver() {
        this.setHighScore();
        this.pauseGame();
        this.scene.scene.wake('gameOver');
    }

    pauseGame() {
        this.scene.scene.pause();
        this.status = 'pause'
    }

    replay(){
        return ()=>{
            this.setScore(0);
            this._timeStart = -1;
            this.obstacles.forEach(this.disable);
            this.disable(this.currentObstacle);
            this.currentObstacle = null;
            this.obstacles = [];
            this.dinosaur.reset();
            this.status = 'running';
        }
    } 
    updateScore(time) {
        if (this.status == 'running') {
            if (this._timeStart == -1) {
                this._timeStart = time;
            }
            this.setScore((time-this._timeStart)/10);    
        }
        
    }
    setScore(score) {
        this._score = Math.floor(Number(score));
        this.score.setScore(this._score);
    }
    setHighScore() {
        this._highScore = Math.max(this._highScore, this._score);
        this.highScore.setScore(this._highScore);
    }

    touchOtacles(){
        return (col1, col2) => {
            this.gameOver();
        }
    } 


    update(time, delta) {
        this.updateScore(time);
        this.generateObstacleByTime(delta);
        if (this.currentObstacle != null){
            if (this.currentObstacle.x < -10) {
                this.disable(this.currentObstacle);
                this.getNewCurrentObstacles();
            }
        }
        else {
            this.getNewCurrentObstacles();
        }
        
    }
    getNewCurrentObstacles() {
        if (this.obstacles.length > 0) {
            this.currentObstacle = this.obstacles.shift();
        }
        else {
            this.currentObstacle = null;
        }
        return this.currentObstacle;
    }

    disable(obstacle) {
        obstacle.setActive(false).setVisible(false);
        obstacle.body.enable = false;
    }
    enable(obstacle) {
        obstacle.setActive(true).setVisible(true);
        obstacle.body.enable = true;
        obstacle.setSpeed(this.currentSpeed);
    }
}