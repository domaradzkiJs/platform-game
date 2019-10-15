"use strict"

LootHunter.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;
  this.optionButton = null;

};

LootHunter.MainMenu.prototype = {

  create: function () {

    this.add.sprite(0,0,'preloaderBackground');
        this.playButton = this.add.button(320,520,'button',this.startGame,this,2,1,0); 

       

  },

  update: function () {

    //  cutomizowanie menu

  },

  startGame: function (pointer) {

    //  stopowanie muzyki z menu
    //this.music.stop();
      this.state.restart('Game');
     this.state.start('Game');
   },



startOptions: function (pointer) {

    //  stopowanie muzyki z menu
    //this.music.stop();

    this.state.start('Options');

  }

};