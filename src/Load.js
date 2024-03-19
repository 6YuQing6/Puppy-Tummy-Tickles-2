class Load extends Phaser.Scene {
    constructor(){
        super('loadScene')
    }

    preload(){
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // loads assets
        this.load.path = './assets/'
        // loads graphics 
        this.load.image('background', 'background.png');
        this.load.image('bigheart', 'bigheart.png');
        this.load.image('hand', 'hand.png');
        this.load.image('flower', 'flower.png')
        this.load.image('cloud', 'clouds.png')
        this.load.image('highscore','highscore.png');
        this.load.image('instructions', 'instructions.png');
        this.load.image('credits','credits.png');

        // loads sounds
        this.load.audio('puppyMove', 'sounds/handMove.wav');
        this.load.audio('handMove', 'sounds/puppyMove1.mp3');
        this.load.audio('heartIncrease', 'sounds/heartincrease.mp3');
        this.load.audio('heartDecrease', 'sounds/heartdecrease.wav');
        this.load.audio('tickle', 'sounds/sfx_movement_portal5.wav');
        this.load.audio('puppyBark', 'sounds/Dog1.wav');
        this.load.audio('puppyHurt', 'sounds/roblox-death-sound_1.mp3');
        this.load.audio('select','sounds/select.wav');
        this.load.audio('lose', 'sounds/Jingle_Lose_00.mp3');
        this.load.audio('pop','sounds/pop-39222.mp3');
        this.load.audio('explosion', 'sounds/explosion(1).wav');

        // loads fonts
        // https://www.dafont.com/pixelmix.font
        // The font file in this archive was created by Andrew Tyler www.AndrewTyler.net and font@andrewtyler.net
        this.load.bitmapFont('pixelFont', 'fonts/pixelmix.png', 'fonts/pixelmix.xml');
        /* 
        Music from #Uppbeat (free for Creators!):
        https://uppbeat.io/t/kevin-macleod/itty-bitty-8-bit
        License code: JEPNRDXVBUOWZIMK
        */
        this.load.audio('bgm1','sounds/itty-bitty-8-bit-kevin-macleod-main-version-03-13-7983.mp3')
        /*
        Music from #Uppbeat (free for Creators!):
        https://uppbeat.io/t/michael-grubb/floating-cat
        License code: ZVNZ9KGR2I6WCWWW
        */
        this.load.audio('bgm2', 'sounds/floating-cat-michael-grubb-main-version-24551-01-53.mp3')
        //https://www.fesliyanstudios.com/royalty-free-music/downloads-c/8-bit-music/6
        this.load.audio('bgm', 'sounds/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3');

        // loads spritesheets
        this.load.spritesheet('menu', 'menu-Sheet.png', {
            frameWidth: 178,
            frameHeight: 138,
        });
        this.load.spritesheet('puppy', 'puppy-Sheet.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('smallheart', 'smallheart-Sheet.png', {
            frameWidth: 23,
            frameHeight: 22,
        });
        this.load.spritesheet('explosion', 'explosion-Sheet.png', {
            frameWidth: 263,
            frameHeight: 247,
        })
        // load sound https://opengameart.org/content/8-bit-sound-effects-library
        // https://opengameart.org/content/dog-sounds 
    }
    create(){
        // explosion animation
        this.anims.create({
            key: 'explosion',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 5
            })
        })
        // menu animation
        this.anims.create({
            key: 'menu_blink',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('menu', {
                start: 0,
                end: 1,
            })
        });
        // puppy animation
        this.anims.create({
            key: 'puppy_layDown',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [9, 10, 11, 12]
            })
        });
        this.anims.create({
            key: 'puppy_happy',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [15,16,17]
            })
        });
        this.anims.create({
            key: 'puppy_stand',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [0, 1, 2, 1]
            })
        });
        this.anims.create({
            key: 'puppy_walk',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('puppy', {
                start: 3,
                end: 8
            })
        })
        this.anims.create({
            key: 'puppy_sad',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [18, 19]
            })
        });
        this.anims.create({
            key: 'puppy_jabbed',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('puppy', {
                frames: [13,14]
            })
        })

        // heart animation
        this.anims.create({
            key: 'heartPLUS',
            frameRate: 33,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('smallheart', {
                start: 0,
                end: 13
            })
        });
        this.anims.create({
            key: 'heartMINUS',
            frameRate: 33,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('smallheart', {
                start: 13,
                end: 0
            })
        });

        this.scene.start('menuScene')
    }
}