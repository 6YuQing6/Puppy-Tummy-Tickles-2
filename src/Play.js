class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    create() {
        this.playing = true
        this.background = this.add.image(0,0,'background').setOrigin(0,0);

        // adds objects to scene
        this.puppy = new Puppy(this, 60, 110); 
        this.puppy.setDepth(100);
        this.hand = new Hand(this, 100, 50);
        this.hand.setDepth(101);
        this.hearts = new Hearts(this, 12, 12, 2);
        this.hearts.initialize();
        this.bigheart = this.add.sprite(0,0,'bigheart',0).setVisible(false);
        this.explosion = this.add.sprite(0,0, 'explosion', 0).setVisible(false).setScale(0.2);
        this.timer = this.add.bitmapText(width - 5, 12, 'pixelFont', '').setOrigin(1);

        // adds sounds to scene
        this.barkSFX = this.sound.add('puppyBark', {volume: 2});
        this.bgm = this.sound.add('bgm1', {volume: 0.2, loop: true});
        this.bgm.play();
        this.lose = this.sound.add('lose', {volume: 0.5});
        this.pop = this.sound.add('pop');
        this.explode = this.sound.add('explosion');

        // adds enemy flowers to scene
        this.flower = new Flower(this, 100, 110);
        this.flowergroup = this.add.group({
            runChildUpdate: true
        });
        this.flowergroup.add(this.flower);
        this.flowerIncrease = true;
        
        // creates controls
        this.keys = this.input.keyboard.createCursorKeys();
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // adds flower creator
        this.time.addEvent({
            delay: this.flower.spawnRate,
            callback: () => {
                let randomX = Phaser.Math.Between(this.flower.width, width-this.flower.width);
                while (this.puppy.x + 40 > randomX && randomX > this.puppy.x - 40){
                    randomX = Phaser.Math.Between(this.flower.width, width-this.flower.width);
                } // x + 5 > this.x && this.x > x - 5
                let flower = new Flower(this, randomX, 110);
                this.flowergroup.add(flower);
                this.flowerIncrease = true;
                console.log('flower added', flower.x, flower.y);
            },
            callbackScope: this,
            loop: true
        });
        
        // // adds hand flower collision
        // this.physics.world.on('overlap', (hand, flower)=>{
        //     flower.destroy();
        // });

        // // adds puppy flower collision
        // this.physics.world.on('overlap', (puppy, flower)=>{
        //     this.hearts.removeHeart();
        //     flower.destroy();
        // })

    }
    update() {

        // game over
        if (this.hearts.life == 0 && this.playing){
            this.playing == false;
            this.time.delayedCall(1500, () => {
                this.lose.play();
                this.bgm.stop();
                this.explosion.setVisible(true);
                this.explosion.setPosition(this.puppy.x, this.puppy.y, 1000);
                this.explode.play();
                this.explosion.play('explosion');
                this.time.delayedCall(1000, () => {
                    this.explosion.setVisible(false);
                });
                this.scene.start('highscoreScene');
            });
        }
        // exit game 
        if (Phaser.Input.Keyboard.JustDown(this.esc)) {
            this.bgm.stop();
            this.scene.start('menuScene');
        }
        this.handFSM.step();
        this.puppyFSM.step();

        // // adds event checker for overlap
        this.physics.overlap(this.hand, this.flowergroup, (hand, flower)=>{
            flower.destroy();
            flowers += 1;
            this.pop.play();
        });

        this.physics.overlap(this.puppy,this.flowergroup, (puppy, flower)=>{
            this.hearts.removeHeart();
            this.puppy.setTint('#FF0000');
            flower.destroy();
            this.explosion.setVisible(true);
            this.explosion.setPosition(this.puppy.x, this.puppy.y, 1000);
            this.explode.play();
            this.explosion.play('explosion');
            this.time.delayedCall(1000, () => {
                this.explosion.setVisible(false);
                this.puppy.clearTint();
            });
        });
        // this.physics.overlap(this.hand, this.puppy);

        // adds hand puppy collision
        this.physics.overlap(this.hand, this.puppy, (hand, puppy)=>{
            if (puppy.layingDown == true && !puppy.tickled){
                // console.log('tickled');
                puppy.happyPet();
                puppy.tickled = true;
                this.barkSFX.play();
                // creates new heart
                this.hearts.addFullHeart();
                hearts += 1;
                // adds heart animation above puppy  head
                if (puppy.flipX){
                    this.bigheart.setPosition(puppy.x - 10, puppy.y - 45);
                } else {
                    this.bigheart.setPosition(puppy.x + 10, puppy.y - 45);
                }
                this.bigheart.setVisible(true);
                this.tweens.add({
                    targets: this.bigheart,
                    y: puppy.y - 55,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () =>{
                        console.log('big heart destroy');
                        this.bigheart.setVisible(false);
                    }
                })
            }
        })

        // increase game difficulty
        if (flowers != 0 && flowers % 3 == 0 && this.flowerIncrease) {
            this.flowerIncrease = false;
            if (this.flower.spawnRate > 1000){
                this.flower.spawnRate -= 1000;
                this.bgm.rate += 0.01
                this.puppy.layDownTime -= 100;
                console.log('increase difficulty')
            }
        }
    }
}