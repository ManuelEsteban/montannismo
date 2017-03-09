var bootState = {
    preload: function () {
        this.scale.pageAlignHorizontally = true; // Centra la pantalla del juegos 
        game.load.image('fondoMenu', 'assets/fondos/Fondo menu.jpg');
        game.load.image('logo', 'assets/fondos/Logo.png');
        game.load.spritesheet('progressBar', 'assets/progressBar.png', 205,27);
    },
    
    
    create: function() {
        // Set some game settings
        game.stage.backgroundColor = '#58b6f5';
       // game.add.plugin(Phaser.Plugin.Tiled);
        game.physics.startSystem(Phaser.Physics.P2JS);
        // Start the load state
        game.state.start('load');
    }
};