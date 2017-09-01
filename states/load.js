var loadState = {   
    preload: function () {    
        game.add.image(0, 0, 'fondoMenu');
        game.add.image(game.world.centerX-320, game.world.centerY-200, 'logo');
        
        // BARRA DE PROGRESO
        this.progressBarFondo = game.add.image(0, 0, 'progressBar');
        this.progressBar = game.add.image(0, 0, 'progressBar');

        // Se coloca la barra de progreso centrada al fondo
        this.progressBar.x = game.camera.width/2 - this.progressBar.width/2;
        this.progressBar.y = game.camera.height - this.progressBar.height/2-50;
        this.progressBarFondo.x = this.progressBar.x;
        this.progressBarFondo.y = this.progressBar.y;
        
        // Se muestra el progreso mientas se carga
        this.progressBar.animations.add("progreso_azul", [0]);
        this.progressBarFondo.animations.play("progreso_azul", 60, true);
        this.progressBarFondo.animations.add("fondo_negro", [1]);
        this.progressBarFondo.animations.play("fondo_negro", 60, true);

        // Texto de carga: "Caragando coche y terrenos..."
        var fuente = {font: '40px Ranga   ', fill: "#FFEFC9"};
        var infoCarga = game.add.text(game.camera.width/2, this.progressBar.y-25, "Cargando coches y terrenos...", fuente);
        infoCarga.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        infoCarga.anchor.setTo(0.5, 0.5);
        
        // Ajusta el ancho de la barra de progreso en base al tiempo real de carga
        this.load.setPreloadSprite(this.progressBar);
        
        
        // FONDO
        game.load.image('puntuacion', '../assets/fondos/Puntuacion.png');
        game.load.image('record', '../assets/fondos/Record.png');
        game.load.image('empezar', '../assets/fondos/Empezar.png');
        game.load.image('money', '../assets/fondos/money.png');
        game.load.image('elige', '../assets/fondos/elige_personaje.png');
        game.load.image('flecha_d', '../assets/fondos/flecha.png');
        game.load.image('flecha_i', '../assets/fondos/flecha_izq.png');
        game.load.image('home', '../assets/fondos/home.png');
        game.load.image('hills', '../assets/fondos/hills.png');
        game.load.image('cueva', '../assets/fondos/fondo_cueva.png');
        game.load.image('luna', '../assets/fondos/fondo_luna.png');
        game.load.image('cielo_movil', '../assets/fondos/sky2.png');
        game.load.image('aceptar', '../assets/fondos/aceptar.png');
        game.load.image('mejorar', '../assets/fondos/mejorar.png');
        game.load.image('cancelar', '../assets/fondos/cancelar.png');
        game.load.spritesheet('fullscreen', '../assets/PantallaCompleta.png', 63, 63, 2);
        game.load.spritesheet('shadow', '../assets/shadow.png', 138, 15);

        //game.load.image('fondoMenu2', 'assets/fondos/Fondo menu3.jpg');
        // MEJORAS
        game.load.image('mejoras', '../assets/fondos/mejoras.png');
        game.load.image('motor', '../assets/fondos/motor.png');
        game.load.image('frenos', '../assets/fondos/frenos.png');
        game.load.image('suspension', '../assets/fondos/suspension.png');
        game.load.image('transmision', '../assets/fondos/transmision.png');
        game.load.image('mejora_motor', '../assets/coches/mejoras/motor.png');
        game.load.image('mejora_freno', '../assets/coches/mejoras/frenos.png');
        game.load.image('mejora_suspension', '../assets/coches/mejoras/suspension.png');
        game.load.image('mejora_transmision', '../assets/coches/mejoras/transmision.png');
        game.load.image('popUp', '../assets/fondos/background_message.png');

        // COCHE
        game.load.image('rueda', '../assets/coches/chico/rueda.png');
        game.load.image('coche', '../assets/coches/chico/coche.png');
        game.load.image('conductor', '../assets/coches/chico/conductor.png');
         // COCHE1
        game.load.image('rueda_chica', '../assets/coches/chica/rueda.png');
        game.load.image('coche_chica', '../assets/coches/chica/coche.png');
        game.load.image('conductora', '../assets/coches/chica/conductor.png');
         // COCHE2
        game.load.image('rueda_orco', '../assets/coches/orco/rueda.png');
        game.load.image('coche_orco', '../assets/coches/orco/coche.png');
        game.load.image('conductor_orco', '../assets/coches/orco/conductor.png');
        
        // Elementos de juego
        game.load.spritesheet('moneda', '../assets/monedas.png', 64, 64, 12);
        game.load.spritesheet('combustible', '../assets/Combustible.png', 39, 44);
        game.load.spritesheet('fuelLow', '../assets/FuelLow.png', 320, 264);
        game.load.image('gasIcon', '../assets/GasIcon.png');
        game.load.image('coinIcon', '../assets/CoinIcon.png');
        game.load.image('pause', '../assets/pause.png');
        game.load.image('menuPause', '../assets/fondos/menupausa.png');
       
        //YOU WIN
        game.load.image('youWin', '../assets/fondos/youWin.png');
        
        
        // MAPAS
        game.load.image('mapas_t', '../assets/fondos/mapas.png');
        game.load.image('cielo', '../assets/GreenHills.png');
       
        game.load.tilemap('mapa_1', '../assets/mapas/mapa1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mapa1', '../assets/mapas/mapa1.png');
        game.load.tilemap('mapa_2', '../assets/mapas/mapa2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mapa2', '../assets/mapas/mapa2.png');
        game.load.tilemap('mapa_3', '../assets/mapas/mapa3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('mapa3', '../assets/mapas/mapa3.png'); 

        
        // SONIDOS
        game.load.audio('prueba', ['../assets/sonidos/Pruebaaaa.mp3']);
        game.load.audio('marcha', ['../assets/sonidos/carSound.mp3']);
        game.load.audio('coinSound', ['../assets/sonidos/coinSound.mp3']);
        game.load.audio('gasSound', ['../assets/sonidos/gasSound.mp3']);
        game.load.audio('gasLowSound', ['../assets/sonidos/gasLowSound.mp3']);
        
        game.load.spritesheet('sonido', '../assets/sonido.png', 40, 40, 2);          

        //LEVELS PRUEBA MAPAS
        game.load.image('yellow', '../assets/levels/yellowBlock.png')
        game.load.image('aceptar2', '../assets/levels/stripe.png')
        game.load.image('l1', '../assets/levels/level1_r2.png');
        game.load.image('l2', '../assets/levels/level2_r2.png');
        game.load.image('l3', '../assets/levels/level3_r2.png');
        
        
        /* Creamos el jugador, los coches y sus propiedades */
        game.global.player = new Player();
        game.global.player.createCars();
    },
    
    create: function() {
        // Go to the menu state
        game.state.start('menu');
    }
};