class Instructions extends Phaser.Scene {
  constructor() {
      super('instructionScene');
  }
  create(){
      this.instructions = this.add.image(0,0,'instructions',0).setOrigin(0,0);
      this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      this.select = this.sound.add('select');
      this.puppy = this.add.sprite(65,95,'puppy');
      this.puppy.play('puppy_layDown');
      // this.hand = this.add.image(100, 50, 'hand');
      this.flower = this.add.image(130,100, 'flower');
      this.add.bitmapText(width/2,55,'pixelFont','left right to move').setOrigin(0.5);
      this.add.bitmapText(width/2,65,'pixelFont','down to tickle').setOrigin(0.5);
      this.add.bitmapText(65,120,'pixelFont','puppy').setOrigin(0.5);
      this.add.bitmapText(130,120,'pixelFont','hurts\npuppy').setOrigin(0.5);
      this.add.bitmapText(3, 3,'pixelFont', 'X (ESC)').setOrigin(0);
  }
  update(){
    if (Phaser.Input.Keyboard.JustDown(this.esc)) {
      this.select.play();
      this.scene.stop();
    }
  }
}