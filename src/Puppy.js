class Puppy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'puppy');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(this.width/5 + 3, this.height/10);
        this.body.setOffset(15,35);
        this.body.onOverlap = true;
        this.setCollideWorldBounds(true);
        this.layDownTime = 3000;
        this.moving = false;
        this.moveTime = 250;
        this.moveToX = 100;
        this.layingDown = false;
        this.tickled = false;
        
        this.moveSFX = scene.sound.add('puppyMove', {volume: 0.5});

        scene.puppyFSM = new StateMachine('walk', {
            stand: new StandState(),
            walk: new WalkState(),
            layDown: new LayDownState()
            }, [scene, this]);
    }
    happyPet(){
        this.play('puppy_happy');
    }
    sadPet(){
        this.scene.hearts.removeHeart();
        this.play('puppy_sad')
    }
    idle(){
        this.play('puppy_stand');
    }
    walk(){
        this.play('puppy_walk');
    }
    moveTo(x){
        if (!(x + 5 > this.x && this.x > x - 5)){
            if (this.x < x && !this.moving){
                this.x += 5;
                this.moveSFX.play();
                this.flipSprite(false)
                this.moving = true;
                this.scene.time.delayedCall(this.moveTime, () => {
                    this.moving = false;
                });
            } else if (this.x > x && !this.moving){
                this.x -= 5;
                this.moveSFX.play();
                this.flipSprite(true);
                this.moving = true;
                this.scene.time.delayedCall(this.moveTime, () => {
                    this.moving = false;
                });
            }
        } else{
            return true;
        }
    }
    flipSprite(flip){
        if (flip){
            this.flipX = true;
            this.body.setOffset(38,35);
        } else {
            this.flipX = false;
            this.body.setOffset(14,35);
        }
    }
    // timer for when it lays down
    // distance formula or physics boxes for calculating perfect, good, failed tickle
    // tweens for ai movement
}

class StandState extends State {
    enter(scene, puppy){
        puppy.idle();
        scene.time.delayedCall(1500, () => {
            this.stateMachine.transition('walk');
            return;
        });
    }
}

class WalkState extends State {
    enter(scene, puppy){
        puppy.walk();
        console.log('walking')
        puppy.moveToX = Phaser.Math.Between(20,160);
        console.log(puppy.moveToX);
    }
    execute(scene, puppy){
        if (puppy.moveTo(puppy.moveToX)){
            this.stateMachine.transition('layDown');
            return;
        }
    }
}

class LayDownState extends State {
    enter(scene, puppy){
        puppy.play('puppy_layDown');
        puppy.layingDown = true;
        scene.clock = scene.time.delayedCall(puppy.layDownTime, () => {
            puppy.layingDown = false;
            if (puppy.tickled == false) {
                puppy.sadPet();
            }
            scene.time.delayedCall(600, () => {
                puppy.tickled = false;
                this.stateMachine.transition('stand');
                return;
            });
        })
    }
    execute(scene, puppy){
        scene.timer.setText(`${scene.clock.getRemainingSeconds().toFixed(3)}`);
    }
}