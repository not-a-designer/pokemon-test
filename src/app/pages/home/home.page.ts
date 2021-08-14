import { Component } from '@angular/core';

import * as Phaser from 'phaser';
import { BootScene } from 'src/app/scenes/load/boot.scene';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public game: Phaser.Game;

  private _phaserConfig: Phaser.Types.Core.GameConfig = {
    height: 480,
    width: 480,
    type: Phaser.AUTO,
    parent: 'game-container',
    fps: {
      min: 24,
      target: 60
    },
    input: {
      keyboard: true
    }, 
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: BootScene

  }

  constructor() {}

  ngOnInit(): void {
    this.game = new Phaser.Game(this._phaserConfig);
  }

}
