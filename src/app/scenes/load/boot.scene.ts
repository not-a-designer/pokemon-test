import { PreloadScene } from './preload.scene';
import { GameTitleScene } from './game-title.scene';
import { OverworldScene } from '../overworld.scene';

export class BootScene extends Phaser.Scene {

    constructor() {
        super('Boot');
    }

    preload(): void {
        this.scene.add('Preload', PreloadScene, false);
        this.scene.add('GameTitle', GameTitleScene, false);
        this.scene.add('Overworld', OverworldScene, false);
    }

    create(): void {
        this.scene.start('Preload');
    }
}