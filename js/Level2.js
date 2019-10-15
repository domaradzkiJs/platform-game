



EnemySlime = function (index,game,x,y) {
    this.slime = game.add.sprite(x,y,'slime');
    this.slime.anchor.setTo(0.5,0.5);
    this.slime.name = index.toString();
    game.physics.enable(this.slime,Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.slime.animations.add('walk',[0,1,2,3],10,true);
    this.enableBody = true;
    //this.animations.add('right', [0, 1, 2, 3, 4], 5, true);
    //this.animations.add('left', [5, 6, 7, 8, 9], 5, true);
    this.slime.body.gravity.y = 800;
    this.slime.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
    this.slime.body.bounce.x = 1;
    this.slime.body.collideWorldBounds = true;
    this.slime.body.velocity.x =-100;
    this.slime.animations.play('walk');
   // this.slime.body.collideWorldBounds=false;
   // this.slime.body.allowGravity = false;
   // this.slime.body.immovable = true;


   // this.slimeTween= game.add.tween(this.slime).to( {
     //       x: this.slime.x +300
       
      // },2000,'Linear',true,0,100,true);
    

}

EnemySlime.prototype=Object.create(Phaser.Sprite.prototype);
EnemySlime.prototype.constructor = EnemySlime;


 





LootHunter.Level2 = function (game) {

};


LootHunter.Level2.prototype = {


	create: function (game) {

        this.game.renderer.renderSession.roundPixels = true;
        
        this.physics.arcade.gravity.y=0;

      
    
       
     

        respawn=this.game.add.group();
        this.stage.backgroundColor = '#609f86';

      

		this.map = this.game.add.tilemap('map');
       
        this.map.addTilesetImage('platforms','platforms');
         this.map.addTilesetImage('Background', 'Background');
        this.map.setTileIndexCallback(10,this.killGem,this,'groundLayer');
       
        this.map.setTileIndexCallback(6,this.dead,this,'groundLayer');
         this.map.setTileIndexCallback(7,this.dead,this,'groundLayer');
        this.map.setTileIndexCallback(25,this.dead,this,'groundLayer');
        
        this.backgroundlayer=this.map.createLayer('backgroundLayer');
        this.groundlayer = this.map.createLayer('groundLayer');
     
        


        this.groundlayer.resizeWorld();
        this.map.setCollisionBetween(0,5, true, 'groundLayer');
        this.map.setCollisionBetween(8,9, true, 'groundLayer');
        
          coins= this.game.add.group();
          coins.enableBody = true;
          coins.physicsBodyType=Phaser.Physics.ARCADE;
        this.map.createFromObjects('coinsLayer',10,'coin',0,true,false,coins);
        this.map.createFromObjects('spawnLayer',13,'',0,true,false,respawn);


            //  Add animations to all of the coin sprites
       coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5,6,7], 10, true);
       coins.callAll('animations.play', 'animations', 'spin');

        hero=this.game.add.sprite(0,0,'hero');
        hero.anchor.setTo(0.5,0.5);
        this.spawn();

        hero.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 0, 2), 2, true);
        hero.animations.add('run', Phaser.Animation.generateFrameNames('run', 0, 5), 11, true);
        hero.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 0, 4), 5, true);
        hero.animations.add('fall', Phaser.Animation.generateFrameNames('fall', 0, 2), 2, true);
        hero.animations.add('crouch', Phaser.Animation.generateFrameNames('crouch', 0, 3), 5, true);
        hero.animations.add('atk', Phaser.Animation.generateFrameNames('atk', 0, 4), 16, true);
        hero.animations.add('atkrun', Phaser.Animation.generateFrameNames('atk', 2, 4), 16, true);
        hero.animations.add('air', Phaser.Animation.generateFrameNames('air', 0, 3), 2, true);
        

         
        this.game.physics.arcade.enable(hero);
        hero.body.gravity.y=1400;

        //this.game.physics.arcade.enable(coins);


 

        this.game.camera.follow(hero);
        hero.body.collideWorldBounds = true;
       


        controls = {
             down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            atk: this.input.keyboard.addKey(Phaser.Keyboard.J),
           

        };
    
this.playing = true;

        score = this.add.text(16,16,'score：'+ coinPickupCount,{fontSize:'32px',fill:'#000'});
   
        score.fixedToCamera= true;

        alive=this.game.add.sprite(1050,16,'hp');
        alive.fixedToCamera= true;
        alive.animations.add('hp5',[5],1,true);
        alive.animations.add('hp4',[4],1,true);
        alive.animations.add('hp3',[3],1,true);
        alive.animations.add('hp2',[2],1,true);
        alive.animations.add('hp1',[1],1,true);
       
	

//ENTITIES
		//dodac jako grupe?
     
	enemyGroup = game.add.group();	
	enemyGroup.enableBody=true;
	enemyGroup.physicsBodyType=Phaser.Physics.ARCADE;
    enemy1 = new EnemySlime(0,game,500,695);
    enemy2 = new EnemySlime(1,game,300,695);
   
    
    
   enemyGroup.add(enemy1.slime);
   enemyGroup.add(enemy2.slime);
   






    },




 
 	update: function () {

  
 		
		this.game.physics.arcade.collide(hero,this.groundlayer);
		this.game.physics.arcade.collide(enemyGroup,this.groundlayer);
		this.game.physics.arcade.collide(enemyGroup,enemyGroup);
    this.game.physics.arcade.overlap(hero,enemyGroup,this.dstr,null,this);
    this.game.physics.arcade.overlap(hero, coins, this.collectCoin, null, this);
  
      // this.time.now > attackTimer;
        hero.body.velocity.x=0;
        hero.body.offset.y=50;



        if (heroHealth<=0) {
          this.dead();
        }

        if (heroHealth>4) {
          alive.animations.play('hp5');
        } else if (heroHealth>=4) {
          alive.animations.play('hp4');
        } else if (heroHealth>=3) {
          alive.animations.play('hp3');
        } else if (heroHealth>=2) {
          alive.animations.play('hp2');
        } else if (heroHealth>=1) {
          alive.animations.play('hp1');
        } 
        

        enemyGroup.forEach(function(slime){
        	
        })
       
       

        
       



    
     




        ///////////////////////////////////////////////////////////////



         if (controls.atk.isDown) {
             hero.animations.play('atk');
             hero.body.velocity.x =1;
             
        }  


         if (controls.right.isDown ) {
            hero.animations.play('run');
            hero.scale.setTo(1,1);
            hero.body.velocity.x += heroSpeed;

         } 

         if (controls.right.isDown && controls.atk.isDown) {
              hero.animations.play('atk',20);
              this.time.fpsMAX;

         }


         

         if (controls.left.isDown ) {
            hero.animations.play('run');
            hero.scale.setTo(-1,1);
            hero.body.velocity.x -= heroSpeed;

         }

     

          if  (controls.down.isDown ) {
             hero.animations.play('crouch');
              hero.body.velocity.y+=1 ;
              hero.body.velocity.x =0;
              hero.body.offset.y=-14;

        } else if  (!controls.down.isDown ) {
             hero.body.offset.y=0;

        }
     

          if (controls.up.isDown && hero.body.velocity.y<=0 && (hero.body.onFloor()|| hero.body.touching.down) && this.time.now > jumpTimer )
         {
            hero.body.velocity.y =-600;
            jumpTimer=this.time.now +600;
             hero.animations.play('jump');

         } 
        



         if (hero.body.velocity.x==0 && hero.body.velocity.y ==0) {
           
            hero.animations.play('idle');

         }

       /* if (controls.atk.isDown && checkOverlap(hero,enemy1.slime)) {
          
         this.slay();
          
         
          
        } else if (!controls.atk.isDown && checkOverlap(hero,enemy1.slime) ) { this.resetHero();}
      
     */
        if (hero.x > 7460) {
            console.log("win");
            
             this.playing=false;
        }
        if (hero.y > 739 ) {
            this.dead();
        }
        this.quitGame(this.playing);

	}, 




dstr: function(hero,enemy){
     if (controls.atk.isDown) {
      enemyGroup.remove(enemy); 
     
    } else {this.resetHero();}
  },

	quitGame: function (pointer) {

		if(!this.playing) {

            delete this.map;
            delete this.groundlayer;
            delete this.sprite;
            coinPickupCount=0;
            heroHealth=5;
            //takes us back to Main Menu
            this.state.start('MainMenu');
        }
	},

    spawn:function() {
      respawn.forEach(function(spawnPoint){
        hero.reset(spawnPoint.x,spawnPoint.y);
      },this); 
    },



  collectCoin:function (hero, coin) {

    coin.kill();
    coinPickupCount+=1;
    score.setText('score：'+ coinPickupCount);
},

    killGem: function (sprite,tile) {
        if (tile.alpha != 0) {
            tile.alpha = 0;
            this.groundlayer.dirty = true;
            this.collectGem();
            return false;
        }
    },

    collectGem: function () {
      
      coinPickupCount+=1;
      score.setText('score：'+ coinPickupCount);
     
        
    },


    resetHero: function() {
      hero.reset(40,678);
      heroHealth--;

     
    },


   // slay: function() {
     // enemy1.slime.y=-50;
      
    //},


    dead: function () {
        console.log("dead");
        this.playing=false;
    },





};

function checkOverlap(spriteA,spriteB){
    let boundsA = spriteA.getBounds ();
    let boundsB = spriteB.getBounds ();
    return Phaser.Rectangle.intersects (boundsA,boundsB);
}

/*        hero.body.velocity.x=0;
        hero.body.offset.y=50;
         
                  if (controls.atk.isDown) {
             hero.animations.play('atk');
             hero.body.velocity.x =-1;
             
        } 

         if (controls.left.isDown ) {
            hero.animations.play('run');
            hero.scale.setTo(-1,1);
            hero.body.velocity.x -= heroSpeed;

         } else if (controls.right.isDown ) {
            hero.animations.play('run');
            hero.scale.setTo(1,1);
            hero.body.velocity.x += heroSpeed;
        } else { hero.animations.play('idle');

        }

        if (controls.atk.isDown && (controls.left.isDown||controls.right.isDown)) {
          hero.animations.play('atk');
          hero.animations.currentAnim.setFrame(2, true);
        } else if(controls.atk.isDown) { 
          hero.animations.play('atk');
          hero.body.velocity.x =-1;
      }
      */