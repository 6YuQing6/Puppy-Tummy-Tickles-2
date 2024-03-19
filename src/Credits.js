class Credits extends Phaser.Scene {
  constructor() {
      super('creditScene');
  }
  create(){
      this.bgm = this.sound.add('bgm2', {volume: 0.2});
      this.bgm.play();
      this.select = this.sound.add('select');
      this.credits = this.add.image(0,0,'credits',0).setOrigin(0,0);
      SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.add.bitmapText(width/2, 65, 'pixelFont', 'Code and Art: Sunny Han').setOrigin(0.5);
      this.add.bitmapText(width/2, 75, 'pixelFont', 'Teaching: Nathan Altice').setOrigin(0.5);
      this.add.bitmapText(width/2, 85, 'pixelFont', 'Music: from #Uppbeat').setOrigin(0.5);
      this.add.bitmapText(width/2, 95, 'pixelFont', 'Font: from Andrew Tyler').setOrigin(0.5);
      this.add.bitmapText(width/2, 105, 'pixelFont', 'SFX: PixaBay, Juhani Junkala').setOrigin(0.5);
      this.add.bitmapText(width/2, 120, 'pixelFont', 'menu (SPACE)').setOrigin(0.5);
      
  }
  update(){
    if (Phaser.Input.Keyboard.JustDown(SPACE)) {
      this.select.play();
      this.bgm.stop();
      this.scene.start('menuScene');
    }
  }
}