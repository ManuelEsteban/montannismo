var personajeState = {
    
    create: function() {
        // Fondo
        game.add.image(0, 0, 'fondoMenu');
        //game.stage.backgroundColor = 'rgba(250, 210, 99, 0.93)';
        
        // Título del juego y elementos
        var titulo = game.add.image(250, 0, 'elige');
        game.add.tween(titulo).to({y: 100}, 1200).easing(Phaser.Easing.Bounce.Out).start();
        
        game.add.button(900, 500, 'flecha_d', this.start, this); // Flecha derecha
      //  game.add.button(40, 500, 'flecha_i', this.back, this); // Flecha izquierda
        game.add.button(30, 20, 'home', this.home, this); // Menu inicial
        
        var total = game.global.player.getMoney();
        var money = game.add.image(80, 12, 'money');
        var moneyLabel = game.add.text(money.centerX + 85, money.centerY, total, { font: '55px Arizonia', fill: '#EA8805', align: 'center'});
        moneyLabel.anchor.setTo(0.5, 0.5);


        this.c1button = false;
        this.c2button = false;
        this.c3button = false;
        this.shadow = game.add.sprite(0, 0, 'shadow');
        this.shadow.scale.setTo(0.0, 0.0);
        
        // PERSONAJES
        this.c1 = game.add.button(200, 250, 'conductora', this.selectPersonajeC1, this);
        this.c1.resizeFrame('conductora', 95, 73);   
        this.c2 = game.add.button(450, 250, 'conductor', this.selectPersonajeC2, this);
        this.c2.resizeFrame('conductor', 95, 73);       
        this.c3 = game.add.button(700, 250, 'conductor_orco', this.selectPersonajeC3, this);
        
        
        //BOTON DE SONIDO ON/OFF        
        this.botonSonido = game.add.button(game.camera.width-130, 20, 'sonido', this.gestionarSonido, this);
        this.botonSonido.input.useHandCursor = true;
        if (game.sound.mute) 
            this.botonSonido.frame = 0;
           
        // PANTALLA COMPLETA
        this.pantallaCompleta = game.add.image(game.camera.width-80, 8, 'fullscreen');
        this.pantallaCompleta.inputEnabled = true;
        this.pantallaCompleta.input.useHandCursor = true;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.pantallaCompleta.events.onInputDown.add(function() {
            // Esta en pantalla completa
            if (game.scale.isFullScreen) {
                game.scale.stopFullScreen();
                this.pantallaCompleta.frame = 0;
            } 
            // No está en pantalla completa
            else {
                game.scale.startFullScreen(false);
                this.pantallaCompleta.frame = 1;
            }
        }, this);
        
        // Cuando se presione la tecla 'Enter' se llama a la función de inicio
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        enterKey.onDown.addOnce(this.start, this);
        rightKey.onDown.addOnce(this.start, this);
    },
    
    /*
     * FUNCIÓN PARA BOTONES DE MUTE/UNMUTE 
     * Activa o desactiva el sonido
     */
    gestionarSonido: function() {
        game.sound.mute = ! game.sound.mute;
        if (game.sound.mute) {
            this.botonSonido.frame = 1;
        }
        else {
            this.botonSonido.frame = 0;
        }
        
    },

    selectPersonajeC1: function(){
        this.c1button = true;
        this.shadow.scale.setTo(0.0, 0.0);
        if(this.c2button == true){
            game.add.tween(this.c2.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.c2button= false;
        }
        if(this.c3button == true){
            game.add.tween(this.c3.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.c3button= false;
        }
        
        this.c1tween = game.add.tween(this.c1.scale).to( { x: 1.5, y: 1.5 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.tweens.add(this.c1tween);
        this.shadow.x = this.c1.x;
        this.shadow.y = this.c1.y + 130;
        game.add.tween(this.shadow.scale).to({x: 1.4, y: 1.4}, 1000, Phaser.Easing.Bounce.Out, true);
        
        game.global.car_id = 1;

    },
     selectPersonajeC2: function(){
        this.c2button = true;
        this.shadow.scale.setTo(0.0, 0.0);
        if(this.c1button == true){
            game.add.tween(this.c1.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.c1button= false;
        }
        if(this.c3button == true){
           game.add.tween(this.c3.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.c3button= false;
        }
        this.c2tween = game.add.tween(this.c2.scale).to( { x: 1.5, y: 1.5 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.tweens.add(this.c2tween);
        this.shadow.x = this.c2.x;
        this.shadow.y = this.c2.y + 130;
        game.add.tween(this.shadow.scale).to({x: 1.2, y: 1.2}, 1000, Phaser.Easing.Bounce.Out, true);

        game.global.car_id = 0;

    },
     selectPersonajeC3: function(){
        this.c3button = true; 
        this.shadow.scale.setTo(0.0, 0.0);
        if(this.c2button == true){
           game.add.tween(this.c2.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.c2button= false;
        }
        if(this.c1button == true){
            game.add.tween(this.c1.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.c1button= false;
        } 
        this.c3tween = game.add.tween(this.c3.scale).to( { x: 1.5, y: 1.5 }, 2000, Phaser.Easing.Bounce.Out, true);
        game.tweens.add(this.c3tween);
        this.shadow.x = this.c3.x;
        this.shadow.y = this.c3.y + 130;
        game.add.tween(this.shadow.scale).to({x: 1.4, y: 1.4}, 1000, Phaser.Easing.Bounce.Out, true);

        game.global.car_id = 2;
    },
    
    start: function() {
        // Pasa a elegir mapa
        game.state.start('mapas');
    },
    
    back: function() {
        // Vuelve al menu
        game.state.start('menu');
    },

    // Vuelve al menu inicial
    home: function(){
        game.state.start('menu');
    }
    
};