var menuState = {
    
    create: function() {
        // Fondo
        game.add.image(0, 0, 'fondoMenu');
        
        // Título del juego
        var titulo = game.add.image(200, 0, 'logo');
        game.add.tween(titulo).to({y: 100}, 1200).easing(Phaser.Easing.Bounce.Out).start();
        
        // Elementos de pantalla
        var home = game.add.image(30, 20, 'home');
        var money = game.add.image(80, 12, 'money');
        var puntuacion = game.add.image(440, 270, 'puntuacion'); 
        var record = game.add.image(440, 320, 'record');
        
        //Best Score!
        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', 0);
        }
        if (game.global.score > localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', game.global.score);
        }
        
        var score =  game.global.score;
        var bestScore = localStorage.getItem('bestScore');
        // Actualizamos la puntuaión del jugador
        if (game.global.updateMoney == true) {
            game.global.updateMoney = false;
            game.global.player.updateMoney(score);
        }
        var total = game.global.player.getMoney();

        var fuente = { font: '45px Arizonia', fill: '#EA8805', align: 'center'}; 
        var scoreLabel = game.add.text(puntuacion.centerX + 50, puntuacion.centerY -25, score, fuente);
        var recordLabel = game.add.text(record.centerX + 80, record.centerY-25, bestScore,fuente);
        var moneyLabel = game.add.text(money.centerX + 85, money.centerY, total, { font: '55px Arizonia', fill: '#EA8805', align: 'center'});

        puntuacion.anchor.setTo(0.5, 0.5);
        record.anchor.setTo(0.5, 0.5);
        scoreLabel.anchor.setTo(0.5, 0.5);
        recordLabel.anchor.setTo(0.5, 0.5);
        moneyLabel.anchor.setTo(0.5, 0.5);

        // Inicio de juego
        var empezar = game.add.image(490, 510, 'empezar');
        empezar.anchor.setTo(0.5, 0.5);
        game.add.tween(empezar.scale).to({x: 0.75, y: 0.75}, 800).to({x: 1, y: 1}, 800).loop().start();
    
        
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
        enterKey.onDown.addOnce(this.start, this);
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

    start: function() {
        // Empieza el juego
        game.state.start('personaje');
    }  
    
};