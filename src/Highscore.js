class Highscore extends Phaser.Scene {
  constructor() {
      super('highscoreScene'); 
  }
  create(){
      this.bgm = this.sound.add('bgm2', {volume: 0.2});
      this.bark = this.sound.add('puppyBark');
      this.select = this.sound.add('select');
      this.highscore = this.add.image(0,0,'highscore',0).setOrigin(0,0);
      SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.time.delayedCall(1000, () => {
        this.bark.play();
        this.totalHearts = this.add.bitmapText(width/2,65,'pixelFont',`total tickles: ${hearts}`).setOrigin(0.5);
      });
      this.time.delayedCall(2000, () => {
        this.bark.play();
        this.totalFlowers = this.add.bitmapText(width/2,80,'pixelFont',`total flowers: ${flowers}`).setOrigin(0.5);
        this.bgm.play();
      });
      this.time.delayedCall(2500, () => {
        this.bark.play();
        this.credits = this.add.bitmapText(width/2,120,'pixelFont','credits (SPACE)').setOrigin(0.5);
      });
  }
  update(){
    if (Phaser.Input.Keyboard.JustDown(SPACE)) {
      this.select.play();
      this.bgm.stop();
      this.scene.start('creditScene');
    }
  }
}