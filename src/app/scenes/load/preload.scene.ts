export class PreloadScene extends Phaser.Scene {

    loadingBackground: Phaser.GameObjects.Graphics;
    progressBar: Phaser.GameObjects.Graphics;
    progressBox: Phaser.GameObjects.Graphics;

    percentText: Phaser.GameObjects.Text;
    assetText: Phaser.GameObjects.Text;
    loadingText: Phaser.GameObjects.Text;

    width: number;
    height: number;

    constructor() {
        super('Preload');
    }

    preload(): void {
        /* PLAYER */
        this.load.spritesheet('player', 'assets/graphics/Characters/boy_run.png', { frameWidth: 32, frameHeight: 48 });

        /* MAPS & TILES */
        this.load.image('outside', 'assets/graphics/Tilesets/Outside.png');
        this.load.tilemapTiledJSON('kanto', 'assets/kanto.json');
        
        this.generateLoadingGraphics();

    }

    create(): void {
    }

    generateLoadingGraphics() {
        this.loadingBackground = this.add.graphics();
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();

        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(140, 275, 320, 50);
        
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.loadingText = this.make.text({
			x: this.width / 2,
			y: this.height / 2 - 50,
			text: 'Loading...',
			style: { font: '20px monospace', fill: '#ffffff' }
		});
        this.loadingText.setOrigin(0.5, 0.5);

        this.percentText = this.make.text({
			x: this.width / 2,
			y: this.height / 2 - 5,
			text: '0%',
			style: { font: '18px monospace', fill: '#ffffff' }
		});
        this.percentText.setOrigin(0.5, 0.5);
        
        this.assetText = this.make.text({
			x: this.width / 2,
			y: this.height / 2 + 50,
			text: '',
			style: { font: '18px monospace', fill: '#ffffff' }
		});

		this.assetText.setOrigin(0.5, 0.5);

		this.loadingBackground.fillStyle(0x000000, 1);
		this.loadingBackground.fillRect(0, 0, 600, 600);
        
        this.load.on('progress', (value: any) => {
            const parsedInt = parseInt(value, 10);
            this.percentText.setText(`${parsedInt * 100}%`);
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(150, 285, 300 * value, 30);
        });

        this.load.on('fileprogress', (file: any) => {
            this.assetText.setText(`Loading asset: ${file.key}`);
        });

        this.load.on('complete', () => {
            this.progressBar.destroy();
            this.progressBox.destroy();
            this.loadingText.destroy();
            this.percentText.destroy();
            this.assetText.destroy();
            this.loadingBackground.destroy();
            console.log('Assets fully loaded!');
            setTimeout(() => this.scene.start('GameTitle'), 200);
        });
    }
}