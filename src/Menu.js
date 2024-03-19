class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    init() {
        this.playing = false
        hearts = 0;
        flowers = 0;
    }
    create(){
        this.bgm = this.sound.add('bgm2', {volume: 0.2});
        this.bgm.play();
        this.select = this.sound.add('select');
        this.menu = this.add.sprite(0,0,'menu',0).setOrigin(0,0);
        this.menu.play('menu_blink', true);
        SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.I = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(SPACE)){
            // console.log('space down')
            this.bgm.stop();
            this.select.play();
            this.scene.start('playScene');
        } else if (Phaser.Input.Keyboard.JustDown(this.I)){
            this.select.play();
            this.scene.launch('instructionScene');
        }
    }
}