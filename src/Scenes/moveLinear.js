class moveLinear extends Phaser.Scene {
    constructor() {
        super("linearScene");
        this.my = {sprite: []};

        this.startX = 400;
        this.startY = 500;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("player", "avatar.png");
        this.load.image("bullet", "bullet.png");
    }

    create() {
        this.playerSprite = this.add.sprite(this.startX, this.startY, "player");

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        let my = this.my;

        if (this.leftKey.isDown) {
            this.playerSprite.x -= 10;
            if (this.playerSprite.x <= 20)
                this.playerSprite.x = 20;
        }
        if (this.rightKey.isDown) {
            this.playerSprite.x += 10;
            if (this.playerSprite.x >= game.config.width - 20)
                this.playerSprite.x = game.config.width - 20;
        }
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            my.sprite.push(this.add.sprite(this.playerSprite.x, 500, "bullet"));
        }

        for (let bullet in my.sprite) {
            my.sprite[bullet].y -= 10;
            if (my.sprite[bullet].y <= 0)
              my.sprite[bullet].destroy();
        }
    }
}