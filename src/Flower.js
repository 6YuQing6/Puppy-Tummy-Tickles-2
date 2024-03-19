class Flower extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'flower');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(this.width, this.height / 2)
    this.body.onOverlap = true;
    this.spawnRate = 6000;
    this.fixedY = y;
    this.scene = scene;
  }
}