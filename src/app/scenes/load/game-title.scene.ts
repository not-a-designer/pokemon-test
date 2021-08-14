export class GameTitleScene extends Phaser.Scene {

    private _titleText: Phaser.GameObjects.Text;
    private _startText: Phaser.GameObjects.Text;
    private _width: number;
    private _height: number;

    constructor() {
        super('GameTitle');
    }

    preload(): void {

    }

    create(): void {
        this._width = this.cameras.main.width;
        this._height = this.cameras.main.height;
        this._titleText = this.make.text({
            x: this._width / 2,
			y: this._height / 2 - 50,
            text: 'Game Title', 
            style: { font: '20px Arial', fill: '#ffffff' }
        });
        this._titleText.setOrigin(0.5, 0.5);

        this._startText = this.make.text({
            x: this._width / 2,
            y: this._height / 2,
            text: 'Start',
            style: { font: '20px Arial', fill: '#ffffff' }
        });
        this._startText.setInteractive(new Phaser.Geom.Rectangle(0, 0, this._startText.width, this._startText.height), Phaser.Geom.Rectangle.Contains);
        
        this._startText.setOrigin(.5, 1);
        this._startText.on('pointerdown', () => this.scene.start('Overworld'));
    }
}