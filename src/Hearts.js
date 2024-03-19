class Hearts {
    constructor(scene, x, y, startingHearts = 2, maxHearts = 6){
        this.scene = scene;
        this.startX = x;
        this.startY = y;
        this.startingHearts = startingHearts;
        this.heartArray = [];
        this.currentHearts = 0; // tracks total hearts displayed (empty and full)
        this.life = 0; // tracks full hearts displayed
        this.maxHearts = maxHearts - 1;
        this.increaseSFX = scene.sound.add('heartIncrease', {volume: 0.5});
        this.decreaseSFX = scene.sound.add('heartDecrease', {volume: 0.5});
        // this.smallheart = this.add.sprite(18,18,'smallheart',0);
    }
    initialize(){
        for (let i = 0; i < this.startingHearts; i++) {
            this.addFullHeart();
        }
    }
    addEmptyHeart(){
        if (this.currentHearts <= this.maxHearts) {
            let x = this.startX + (this.heartArray.length) * 22;
            let y = this.startY;
            let heart = this.scene.add.sprite(x,y,'smallheart');
            this.heartArray.push(heart)
            this.currentHearts += 1;
        } 
        // plays heart increase animation
        // adds new heart to array of hearts
    }
    addFullHeart(){
        if (this.currentHearts <= this.maxHearts) {
            if (this.life >= this.currentHearts){
                this.addEmptyHeart();
            }
            let heart = this.heartArray[this.life];
            heart.play('heartPLUS');
            this.life += 1;
            this.increaseSFX.play();
        }
    }
    removeHeart(){
        if (this.heartArray.length > this.startingHearts) {
            let heart = this.heartArray.pop();
            if (this.life == this.currentHearts){
                heart.play('heartMINUS');
                this.life -= 1;
                this.decreaseSFX.play();
                heart.on('animationcomplete', () => {
                    this.scene.time.delayedCall(300, () => {
                        heart.destroy();
                    });
                    this.currentHearts -= 1;
                })
            } else {
                heart.destroy();
                this.currentHearts -= 1;
            }
        } else if (this.life >= 1) {
            let heart = this.heartArray[this.life - 1];
            heart.play('heartMINUS');
            this.decreaseSFX.play();
            this.life -= 1;
        } else {
            console.log('dead')
        }
    }
    totalHearts(){
        return (this.currentHearts, this.life);
    }
}