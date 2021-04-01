import Phaser from 'phaser';
import TRex from './Scenes/TRex';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 150,
    scene: TRex,
    backgroundColor: 0xFFFFFF,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
