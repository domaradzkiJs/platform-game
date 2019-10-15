var LootHunter = {};

LootHunter.Boot = function (game) {

};

LootHunter.Boot.prototype = {

    preload: function () {

        
        this.load.image('preloaderBackground', 'assets/images/title_background.jpg');
        this.load.image('preloaderBar', 'assets/images/preloadr_bar.png');

    },

    create: function () {

      
        this.input.maxPointers = 1;

       
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.renderer.renderSession.roundPixels = true;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
           
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.renderer.renderSession.roundPixels = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.refresh();
        }


        this.state.start('Preloader');

    }

};