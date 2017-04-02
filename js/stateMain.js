var StateMain = {
  preload: function() {
    // load images into library
    game.load.spritesheet('robot', 'images/main/robot.png', 80, 111, 28);
    game.load.image("tiles", "images/tiles.png");
    game.load.tilemap("map", "maps/map1.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('arrow', 'images/arrowButtons.png', 60, 60, 4);
  },

  create: function() {
    // set up objects, variables
    // sounds, text
    // good guys, explosions
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.robotSize = 0.5;

    this.map = game.add.tilemap("map");
    this.map.addTilesetImage("tiles");

    this.layer = this.map.createLayer("Tile Layer 1");
    this.layer.resizeWorld();
    this.map.setCollisionBetween(0, 24);

    this.upArrow = game.add.sprite(0, 0, "arrow");
    this.downArrow = game.add.sprite(0, 50, "arrow");
    this.leftArrow = game.add.sprite(-50, 25, "arrow");
    this.rightArrow = game.add.sprite(50, 25, "arrow");

    this.upArrow.frame = 0;
    this.downArrow.frame = 1;
    this.leftArrow.frame = 2;
    this.rightArrow.frame = 3;

    this.upArrow.anchor.set(0.5, 0.5);
    this.downArrow.anchor.set(0.5, 0.5);
    this.leftArrow.anchor.set(0.5, 0.5);
    this.rightArrow.anchor.set(0.5, 0.5);

    this.buttonGroup = game.add.group();
    this.buttonGroup.add(this.upArrow);
    this.buttonGroup.add(this.downArrow);
    this.buttonGroup.add(this.leftArrow);
    this.buttonGroup.add(this.rightArrow);

    this.buttonGroup.fixedToCamera = true;
    this.buttonGroup.cameraOffset.setTo(game.width-this.buttonGroup.width/2 - 30, game.height-this.buttonGroup.height);

    this.robot = game.add.sprite(150, 150, "robot");
    this.robot.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12, true);
    this.robot.animations.add('walk', [10,11,12,13,14,15,16,17], 12, true);
    this.robot.animations.add('jump', [18,19,20,21,22,23,24,25], 12, true);
    this.robot.anchor.set(0.5, 0.5);
    this.robot.scale.x = this.robotSize;
    this.robot.scale.y = this.robotSize;

    game.physics.enable(this.robot, Phaser.Physics.ARCADE);

    this.robot.animations.play('idle');
    this.robot.body.gravity.y = 100;
    this.robot.body.bounce.set(0.25);
    this.robot.body.collideWorldBounds = true;

    game.camera.follow(this.robot);
    cursors = game.input.keyboard.createCursorKeys();
    this.map.setTileIndexCallback(25, this.gotBomb, this);
  },

  gotBomb: function(sprite, tile) {
    this.map.removeTile(tile.x, tile.y, this.layer);
  },

  update: function() {
    // constant running loop
    game.physics.arcade.collide(this.robot, this.layer);

    if (this.robot.body.onFloor()) {
      if (Math.abs(this.robot.body.velocity.x) > 100) {
        this.robot.animations.play('walk');
      } else {
        this.robot.animations.play('idle');
      }
    }

    if (this.robot.body.velocity.x > 0) {
      this.robot.scale.x = this.robotSize;
    } else {
      this.robot.scale.x = -this.robotSize;
    }

    if (cursors.left.isDown) {
      this.robot.body.velocity.x = -250;
    }

    if (cursors.right.isDown) {
      this.robot.body.velocity.x = 250;
    }

    // Jumping
    if (cursors.up.isDown) {
      if (this.robot.body.onFloor()) {
        this.robot.body.velocity.y = -Math.abs(this.robot.body.velocity.x) - 150;
        this.robot.animations.play('jump');
      }
    }

    // Stopping
    if (cursors.down.isDown) {
      this.robot.body.velocity.x = 0;
      this.robot.body.velocity.y = 0;
    }
  }
};
