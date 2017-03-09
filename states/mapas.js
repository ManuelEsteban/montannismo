var mapasState = {
    
    create: function(){
        // Fondo
        game.add.image(0, 0, 'fondoMenu2');
        //game.stage.backgroundColor = 'rgba(250, 210, 99, 0.93)';
        
        // Título del juego y elementos
        var titulo = game.add.image(385, 0, 'mapas_t');
        game.add.tween(titulo).to({y: 90}, 1200).easing(Phaser.Easing.Bounce.Out).start();       
        game.add.button(900, 500, 'flecha_d', this.start, this); // Flecha derecha
        game.add.button(40, 500, 'flecha_i', this.back, this); // Flecha izquierda
        game.add.button(30, 20, 'home', this.home, this); // Menu inicial

        var total = game.global.player.getMoney();
        this.money = game.add.image(80, 12, 'money');
        this.moneyLabel = game.add.text(this.money.centerX + 85, this.money.centerY, total, { font: '55px Arizonia', fill: '#EA8805', align: 'center'});
        this.moneyLabel.anchor.setTo(0.5, 0.5);

 
        // CARRUSEL 
        slider = new phaseSlider(game);
        var char1 = game.add.image(0,0,"l1");
        var char2 = game.add.image(0,0,"l2");
        var char3 = game.add.image(0,0,"l3");
        
        var group1 = game.add.group();
        group1.width = 500;
        group1.height = 400;
        char1.scale.setTo(0.5, 0.5);
        char1.x = 500/2 - char1.width/2;
        char1.y = 100;
        
        var group2 = game.add.group();
        group2.width = 500;
        group2.height = 400;
        char2.scale.setTo(0.5, 0.5);
        char2.x = 500/2 - char2.width/2;
        char2.y = 100;

        var group3 = game.add.group();
        group3.width = 500;
        group3.height = 400;
        char3.scale.setTo(0.5, 0.5);
        char3.x = 500/2 - char3.width/2;
        char3.y = 100;
        
        /*var block1 = game.add.image(char1.x-88, char1.y-30,"yellow");
        block1.alpha = 0.9;
        var block2 = game.add.image(char2.x-88, char2.y-30,"yellow");
        block2.alpha = 0.9;
        var block3 = game.add.image(char3.x-88, char3.y-30,"yellow");
        block3.alpha = 0.9;
        var block4 = game.add.image(char4.x-88, char4.y-30,"yellow");
        block4.alpha = 0.9;*/

        //group1.add(block1);
        group1.add(char1);
        //group2.add(block2);
        group2.add(char2);
        //group3.add(block3);
        group3.add(char3);
                    
        slider.createSlider({
            customSliderBG: false,
            sliderBGAlpha: 0.00000001,
            x: game.width / 8 - 500 / 8,
            y: game.height / 2 - 380 / 2,
            customHandleNext: "flecha_d",
            customHandlePrev: "flecha_i",
            objects:[group1, group2, group3],
            onNextCallback: function() {
              window.console.log("next");
            },
            onPrevCallback: function(){
              window.console.log("prev")
            }
        });
        
        var btn = game.add.image((game.width/4+20), (game.height / 2 - 80 / 2)+180, "aceptar2");
        btn.inputEnabled = true;
        btn.events.onInputDown.add(function (e, pointer) {
            var index = slider.getCurrentIndex();
            var text = game.add.text(char1.x+430,char1.y+125,"Mapa seleccionado",{ font: '45px Arima Madurai bold', fill: '#ed8a05', align: 'center'});
            var img = game.add.image(text.x+120, text.y+80, "l"+(index+1));
            img.scale.setTo(0.2, 0.2);
            game.global.map_id = index+1;
        },this); 
        
            
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
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        enterKey.onDown.addOnce(this.start, this);
        rightKey.onDown.addOnce(this.start, this);
        leftKey.onDown.addOnce(this.back, this);
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
    
    start : function(){
        game.state.start('upgrades');
    },
    back: function() {
        game.state.start('personaje');
    },
    // Vuelve al menu inicial
    home: function(){
        game.state.start('menu');
    }
};