var StateMain = {
  preload: function() {
    // load images into library
    game.load.spritesheet('robot', 'images/main/robot.png', 80, 111, 28);
  },

  create: function() {
    // set up objects, variables
    // sounds, text
    // good guys, explosions
    this.robot = game.add.sprite(150, 150, "robot");
    this.robot.animations.add('idle', [0,1,2,3,4,5,6,7,8,9], 12, true);
    this.robot.animations.add('walk', [10,11,12,13,14,15,16,17], 12, true);
    this.robot.animations.add('jump', [18,19,20,21,22,23,24,25], 12, true);

    this.robot.animations.play('idle');
  },

  update: function() {
    // constant running loop
  }
};
