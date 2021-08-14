
export class OverworldScene extends Phaser.Scene {

    map: Phaser.Tilemaps.Tilemap;
    worldLayer: Phaser.Tilemaps.DynamicTilemapLayer;

    player: Phaser.Physics.Arcade.Sprite;
    playerSpeed: number = 320;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('Overworld');
    }

    preload(): void {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(): void {
        console.log('game started');
        this.initMap();
        this.initPlayer();
        this.physics.add.collider(this.player, this.worldLayer);
    }

    update(time: number, delta: number): void {
        //if (!this.cursors || !this.player) return;

        if (this.player) {
            if (this.cursors.up.isDown) this.moveUp();
            else if (this.cursors.down.isDown) this.moveDown();
            else if (this.cursors.left.isDown) this.moveLeft();
            else if (this.cursors.right.isDown) this.moveRight();
            else this.playerIdle();
        }
        

    }

    initMap() {
        this.map = this.make.tilemap({ key: 'kanto', tileWidth: 32 });
        const tileset = this.map.addTilesetImage('Outside', 'outside', 32, 32);
        this.physics.world.setBounds(0, 0, 32 * 408, 32 * 400, true, true, true, true);
        this.map.createDynamicLayer('ground', tileset, 0, 0).setDepth(0);
        this.worldLayer = this.map.createDynamicLayer('world', tileset, 0, 0).setDepth(1);
        this.map.createDynamicLayer('above', tileset, 0, 0).setDepth(10);

        this.worldLayer.setCollisionByExclusion([ -1, 0 ]);
        //this.enableDebugGraphics();

        
        console.log(this.worldLayer.layer.collideIndexes);
    }

    initPlayer() {
        this.player = this.physics.add.sprite(2176, 5768, 'player').setDepth(2);
        this.player.setBodySize(28, 32);
        this.player.setOffset(2, 8);
        this.player.setOrigin(.5 , .5);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);
        this.generateAnimations();
        this.player.play('idle-down');
        
    }

    enableDebugGraphics(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.45);
        this.worldLayer.renderDebug(debugGraphics, {
            tileColor: new Phaser.Display.Color(40, 255, 48, 255), // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

    playerIdle(): void {
        const animKey: string = this.player.anims.currentAnim.key;
        const direction: string = animKey.split('-')[1];
        this.player.play(`idle-${direction}`);
        this.player.setVelocity(0, 0);
    }

    moveUp() {
        this.player.anims.play('move-up', true);
        this.player.setVelocity(0, -this.playerSpeed);
    }

    moveDown() {
        this.player.anims.play('move-down', true);
        this.player.setVelocity(0, this.playerSpeed);
    }

    moveLeft() {
        this.player.anims.play('move-left', true);
        this.player.setVelocity(-this.playerSpeed, 0);
    }

    moveRight() {
        this.player.anims.play('move-right', true);
        this.player.setVelocity(this.playerSpeed, 0);

    }

    generateAnimations(): void {
        this.anims.create({
            key: 'idle-down',
            frames: [{ key: 'player', frame: 0 }]
        });

        this.anims.create({
            key: 'move-down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'idle-up',
            frames: [{ key: 'player', frame: 12}]
        });

        this.anims.create({
            key: 'move-up',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'idle-left',
            frames: [{ key: 'player', frame: 4}]
        });

        this.anims.create({
            key: 'move-left',
            frames: this.anims.generateFrameNumbers( 'player', { start: 4, end: 7 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'idle-right',
            frames: [{ key: 'player', frame: 8 }]
        });

        this.anims.create({
            key: 'move-right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 12,
            repeat: -1
        });
    }
}