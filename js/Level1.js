




let game;
let enemiesGroup;
let chestsGroup;
let coins;
let coinPickupCount=0;
let score;
let hero;
let heroHealth=5;
let alive;
let jump=false;
let right=false;
let left=false;
let duck=false;
let attack=false;







LootHunter.Game = function (game) {

};

 let jumpTimer = 0;


LootHunter.Game.prototype = {




  create: function () {


     this.playing = true;
    this.createMap(1);       
    this.createHero(60,650);
    this.camFollow();
    this.createGroups();
    this.createCoins();
    this.populate();
 
    this.createScore();
      
        alive=this.game.add.sprite(1050,16,'hp');
        alive.fixedToCamera= true;
        alive.animations.add('hp5',[5],1,true);
        alive.animations.add('hp4',[4],1,true);
        alive.animations.add('hp3',[3],1,true);
        alive.animations.add('hp2',[2],1,true);
        alive.animations.add('hp1',[1],1,true);


        if (this.game.device.desktop)
        {
           this.controls = {
        down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        right: this.input.keyboard.addKey(Phaser.Keyboard.D),
        left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        atk: this.input.keyboard.addKey(Phaser.Keyboard.J),
        }}
        else 
        {
            buttonjump = this.game.add.button(1000, 500, 'buttonjump', null, this, 0, 1, 0, 1);
            buttonjump.fixedToCamera = true;  
            buttonjump.events.onInputOver.add(function(){jump=true;});
            buttonjump.events.onInputOut.add(function(){jump=false;});
            buttonjump.events.onInputDown.add(function(){jump=true;});
            buttonjump.events.onInputUp.add(function(){jump=false;});

            buttonright = this.game.add.button(160, 472, 'buttonright', null, this, 0, 1, 0, 1);
            buttonright.fixedToCamera = true;
            buttonright.events.onInputOver.add(function(){right=true;});
            buttonright.events.onInputOut.add(function(){right=false;});
            buttonright.events.onInputDown.add(function(){right=true;});
            buttonright.events.onInputUp.add(function(){right=false;});

            buttonleft = this.game.add.button(10, 472, 'buttonleft', null, this, 0, 1, 0, 1);
            buttonleft.fixedToCamera = true;
            buttonleft.events.onInputOver.add(function(){left=true;});
            buttonleft.events.onInputOut.add(function(){left=false;});
            buttonleft.events.onInputDown.add(function(){left=true;});
            buttonleft.events.onInputUp.add(function(){left=false;});

            buttondown = this.game.add.button(95, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
            buttondown.fixedToCamera = true;
            buttondown.events.onInputOver.add(function(){duck=true;});
            buttondown.events.onInputOut.add(function(){duck=false;});
            buttondown.events.onInputDown.add(function(){duck=true;});
            buttondown.events.onInputUp.add(function(){duck=false;});

            buttonattack = this.game.add.button(1100, 500, 'buttonattack', null, this, 0, 1, 0, 1);
            buttonattack.fixedToCamera = true;
            buttonattack.events.onInputOver.add(function(){attack=true;});
            buttonattack.events.onInputOut.add(function(){attack=false;});
            buttonattack.events.onInputDown.add(function(){attack=true;});
            buttonattack.events.onInputUp.add(function(){attack=false;});  
        }

  },

  createScore: function () {

  
     
        score = this.add.text(16,16,'score：'+ coinPickupCount,{fontSize:'32px',fill:'#000'});
        score.fixedToCamera= true;

    },

  createMap: function (levelNum) {
    
    if(levelNum==1) {
      levelNum = "1";      
      this.stage.backgroundColor = '#609f86';
    }
    //mapa poziom 1
    map = this.game.add.tilemap("level" + levelNum);
    map.addTilesetImage('platforms','platforms');
    map.addTilesetImage('Background', 'Background');
        //warstwy
    this.backgroundlayer=map.createLayer('backgroundLayer');
    this.groundlayer = map.createLayer('groundLayer');
    this.collideLayer = map.createLayer('invisibleLayer');
    this.collideLayer.visible=false;
    
    map.setTileIndexCallback([6,7],this.dead,this,'groundLayer');
    
    //kolizje
    map.setCollisionBetween(0,5, true, 'groundLayer');
    map.setCollisionBetween(8,9, true, 'groundLayer');
     map.setCollisionBetween(12,13, true, 'invisibleLayer');
    
    this.groundlayer.resizeWorld();

  },



  createHero: function (x,y) {
    let pos = new Hero(this.game, x, y);
    this.game.add.existing(pos);
  },

  camFollow: function () {
    this.game.camera.follow(hero, Phaser.Camera.FOLLOW_PLATFORMER);
  },

  createGroups: function () {
    enemiesGroup = this.game.add.group();
    enemiesGroup.enableBody = true;

    chestsGroup = this.game.add.group();
    chestsGroup.enableBody = true;



  },

  createCoins:function () {
    coins = this.game.add.group();
    coins.enableBody = true;
    coins.physicsBodyType=Phaser.Physics.ARCADE;

    map.createFromObjects('coinsLayer',10,'coin',0,true,false,coins);  
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5,6,7], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');  


  }, 

         collectCoin:function (hero, coin) {
        coin.kill();
        coinPickupCount++;
        score.setText('score：'+ coinPickupCount);

}, 



   populate: function () {
    this.spawnSlime(300,650);
    this.spawnSlime(600,650);
    this.spawnSlime(1976,650);
    this.spawnSlime(3400,450);
     this.spawnSlime(3333,660);
   

   },





   spawnSlime: function (x,y) {
    let pos= new Slime(this.game, x, y);
    this.game.add.existing(pos);
    enemiesGroup.add(pos);
   },


dstr: function(hero,enemy){

  if (this.game.device.desktop) {
     if (this.controls.atk.isDown) {
      enemiesGroup.remove(enemy); 
     
    } else {this.resetHero();}
  } else if (attack) {
    enemiesGroup.remove(enemy); 
  } else {this.resetHero();}
  },

     

      resetHero: function() {
      hero.reset(40,678);
      heroHealth--;
    
     
    },




    dead: function () {
           this.playing=false;
           
    
    },

  quitGame: function (pointer) {

    if(!this.playing) {
            
            heroHealth=5;
          coinPickupCount=0;
            this.state.start('MainMenu');
        }
  },





 	update: function () {
     this.game.physics.arcade.collide(enemiesGroup, this.groundlayer);
     this.game.physics.arcade.collide(enemiesGroup, this.collideLayer);
     this.game.physics.arcade.collide(enemiesGroup, enemiesGroup);   
     this.game.physics.arcade.collide(hero,this.groundlayer);
     this.game.physics.arcade.overlap(hero, coins, this.collectCoin, null, this);
     this.game.physics.arcade.overlap(hero,enemiesGroup,this.dstr,null,this);
      
    
              if (heroHealth<=0) {
          this.dead();
        }

        if (heroHealth==5) {
          alive.animations.play('hp5');
        } else if (heroHealth==4) {
          alive.animations.play('hp4');
        } else if (heroHealth>=3) {
          alive.animations.play('hp3');
        } else if (heroHealth>=2) {
          alive.animations.play('hp2');
        } else if (heroHealth>=1) {
          alive.animations.play('hp1');
        } 








 		/*
	
	
		this.game.physics.arcade.collide(enemyGroup,enemyGroup);
    this.game.physics.arcade.overlap(hero,enemyGroup,this.dstr,null,this);
    this.game.physics.arcade.overlap(hero, coins, this.collectCoin, null, this);
  
      // this.time.now > attackTimer;
    
*/
    hero.body.velocity.x=0;



    this.moveHero();   
  
     

	}, 

  moveHero: function () {

        let heroSpeed = 350;
      
        if (this.game.device.desktop) {


         if (this.controls.right.isDown) {
            hero.animations.play('run');
            hero.scale.setTo(1,1);
            hero.body.velocity.x += heroSpeed;
         } 

         if (this.controls.atk.isDown) {
             hero.animations.play('atk');
             hero.body.velocity.x =1;
           }  
         if (this.controls.right.isDown && this.controls.atk.isDown) {
              hero.animations.play('atk',20);
             

         }
       

         if (this.controls.left.isDown ) {
            hero.animations.play('run');
            hero.scale.setTo(-1,1);
            hero.body.velocity.x -= heroSpeed;

         }

     

          if  (this.controls.down.isDown ) {
             hero.animations.play('crouch');
              hero.body.velocity.y+=1 ;
              hero.body.velocity.x =0;
              hero.body.offset.y=-14;

        } else if  (!this.controls.down.isDown ) {
             hero.body.offset.y=0;

        }
     

          if (this.controls.up.isDown  && hero.body.velocity.y<=0 && (hero.body.onFloor()|| hero.body.touching.down) && this.time.now > jumpTimer )
         {
            hero.body.velocity.y =-600;
            jumpTimer=this.time.now +600;
             hero.animations.play('jump');

         } // else if (hero.body.velocity.y > 0) {
          //  hero.animations.play("fall");
        //}
        

         if (hero.body.velocity.x==0 && hero.body.velocity.y ==0) {
           
            hero.animations.play('idle');

         } } else   {

                   if (right) {
            hero.animations.play('run');
            hero.scale.setTo(1,1);
            hero.body.velocity.x += heroSpeed;
         } 

         if (attack) {
             hero.animations.play('atk');
             hero.body.velocity.x =1;
           }  
         if (right&& attack) {
              hero.animations.play('atk',20);
             

         }
       

         if (left ) {
            hero.animations.play('run');
            hero.scale.setTo(-1,1);
            hero.body.velocity.x -= heroSpeed;

         }

     

          if  (duck) {
             hero.animations.play('crouch');
              hero.body.velocity.y+=1 ;
              hero.body.velocity.x =0;
              hero.body.offset.y=-14;

        } else if  (!duck ) {
             hero.body.offset.y=0;

        }
     

          if (jump  && hero.body.velocity.y<=0 && (hero.body.onFloor()|| hero.body.touching.down) && this.time.now > jumpTimer )
         {
            hero.body.velocity.y =-600;
            jumpTimer=this.time.now +600;
             hero.animations.play('jump');

         } // else if (hero.body.velocity.y > 0) {
          //  hero.animations.play("fall");
        //}
        

         if (hero.body.velocity.x==0 && hero.body.velocity.y ==0) {
           
            hero.animations.play('idle');

         }
         }
          if (this.game.input.currentPointers == 0 && !this.game.input.activePointer.isMouse){ attack=false; right=false; left=false; duck=false; jump=false;}
        

        if (hero.x > 7460) {
             // this.state.start('Level2');          
            this.playing=false;
        }
        if (hero.y > 739 ) {
            this.dead();
        }
        this.quitGame(this.playing);

   },





  }




Hero = function (game, x, y){
this.initX = x;
this.initY = y;
this.health = 5;
Phaser.Sprite.call(this, game, x, y, "hero");
this.anchor.setTo(0.5,0.5);
game.physics.arcade.enable(this);
this.body.gravity.y=1400;
this.body.collideWorldBounds = true;
this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 0, 2), 4, true);
this.animations.add('run', Phaser.Animation.generateFrameNames('run', 0, 5), 11, true);
this.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 0, 4), 5, true);
this.animations.add('fall', Phaser.Animation.generateFrameNames('fall', 0, 2), 2, true);
this.animations.add('crouch', Phaser.Animation.generateFrameNames('crouch', 0, 3), 5, true);
this.animations.add('atk', Phaser.Animation.generateFrameNames('atk', 0, 4), 16, true);
this.animations.add('atkrun', Phaser.Animation.generateFrameNames('atk', 2, 4), 16, true);
this.animations.add('air', Phaser.Animation.generateFrameNames('air', 0, 3), 2, true);
this.kind = "hero";
hero=this;
}  
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;   


//Slime

Slime = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "slime");
    this.animations.add('walk', [0,1,2,3],10,true);
    this.animations.play("walk");
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
    this.speed = 100;
    this.body.velocity.x = this.speed;
    this.body.bounce.x = 1;
    this.kind = "slime";
}

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;
Slime.prototype.update = function () {
    if (this.body.velocity.x < 0) {
        this.scale.x = -1;

    } else {
        this.scale.x = 1;

    }
}
Slime.prototype.turnAround = function () {
    if (this.body.velocity.x > 0) {
        this.body.velocity.x = -this.speed;
        this.x -= 5;
    } else {
        this.body.velocity.x = this.speed;
        this.x += 5;
    }

}

