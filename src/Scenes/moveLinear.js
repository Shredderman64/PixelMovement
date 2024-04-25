class moveLinear extends Phaser.Scene {
    constructor() {
        super("linearScene");
        this.bullets = {sprite: []};

        this.startX = 400;
        this.startY = 500;
        this.bulletCooldown = 0;
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
        let bullets = this.bullets;
        
        if (this.bulletCooldown > 0)
            this.bulletCooldown -= 1;

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
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.bulletCooldown == 0) {
            bullets.sprite.push(this.add.sprite(this.playerSprite.x, 500, "bullet"));
            this.bulletCooldown = 20;
        }

        for (let bullet in bullets.sprite) {
            bullets.sprite[bullet].y -= 20;
            if (bullets.sprite[bullet].y <= 0)
                bullets.sprite[bullet].destroy();
        }
    }
}