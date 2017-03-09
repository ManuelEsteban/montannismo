var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');

// Variables Globales
game.global = {
    score: 0,
    car_id: 0,
    map_id: 1,
    updateMoney: false,
    player: null
};

// Estados
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('personaje', personajeState);
game.state.add('upgrades', upgradesState);
game.state.add('mapas', mapasState);
// Inicia el estado 'boot'
game.state.start('boot');