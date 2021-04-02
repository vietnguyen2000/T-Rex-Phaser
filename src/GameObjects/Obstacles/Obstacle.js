export default class Obstacle extends Phaser.GameObjects.Sprite {
    setSpeed(speed) {
        this.body.setVelocityX(-speed);
    }
    getPixel(x, y) {
        return this.scene.textures.getPixel(x,y,this.texture.key,this.anims.currentFrame.frame.sourceIndex)
    }
}