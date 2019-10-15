
LootHunter.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

LootHunter.Preloader.prototype = {

  preload: function () {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite(400, 600, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    this.load.spritesheet('button', 'assets/images/button_sprite_sheet.png',265,98);
    
    this.load.tilemap('level1', 'assets/tilemap/level1.json',null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('buttonjump', 'assets/images/buttons/jump.png',80,80);
    this.load.spritesheet('buttonattack', 'assets/images/buttons/attack.png',80,80);
    this.load.spritesheet('buttonleft', 'assets/images/buttons/left.png',76,61);
    this.load.spritesheet('buttonright', 'assets/images/buttons/right.png',75,61);
     this.load.spritesheet('buttonvertical', 'assets/images/buttons/duck.png',61,75);
    this.load.spritesheet('coin', 'assets/images/Coin.png',32,38);
    this.load.spritesheet('hp', 'assets/images/HP.png',194,40);
    this.load.image('platforms', 'assets/images/platforms.png');
    this.load.image('Background', 'assets/images/Background.png');
    this.load.atlas('hero', 'assets/images/sprites.png', 'assets/images/sprites.json');
    this.load.spritesheet('slime', 'assets/images/Slime_Walk.png',101,42);
  },

  create: function () {

   
    this.preloadBar.cropEnabled = false;

  },

  update: function () {


      this.ready = true;
      this.state.start('MainMenu');


  }

};