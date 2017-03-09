var upgradesState = {
    
    create: function() {
        // Fondo
        game.add.image(0, 0, 'fondoMenu');
        //game.stage.backgroundColor = 'rgba(250, 210, 99, 0.93)';
        
        // Título del juego y elementos
        var titulo = game.add.image(350, 0, 'mejoras');
        game.add.tween(titulo).to({y: 100}, 1200).easing(Phaser.Easing.Bounce.Out).start();
        
        game.add.button(900, 500, 'flecha_d', this.start, this); // Flecha derecha
        game.add.button(40, 500, 'flecha_i', this.back, this); // Flecha izquierda
        game.add.button(30, 20, 'home', this.home, this); // Menu inicial

        var total = game.global.player.getMoney();
        this.money = game.add.image(80, 12, 'money');
        this.moneyLabel = game.add.text(this.money.centerX + 85, this.money.centerY, total, { font: '55px Arizonia', fill: '#EA8805', align: 'center'});
        this.moneyLabel.anchor.setTo(0.5, 0.5);

        // MEJORAS
        this.car = game.global.player.getCarById(game.global.car_id);
        this.freno = game.add.button(140, 220, 'mejora_freno', this.upgradeFrenos, this); 
        game.add.image(170, 380, 'frenos');
        this.motor = game.add.button(340, 220, 'mejora_motor', this.upgradeMotor, this); 
        game.add.image(370, 380, 'motor');
        this.suspension = game.add.button(540, 220, 'mejora_suspension', this.upgradeSuspension, this);     
        game.add.image(540, 380, 'suspension');
        this.transmision = game.add.button(740, 220, 'mejora_transmision', this.upgradeTransmision, this);
        game.add.image(730, 380, 'transmision');
        this.type = null;
        
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

    upgradeFrenos: function() {
        this.type = "frenos";
        this.upgrade = this.car.getUpgrade("frenos");
        new UpgradeMessage(this.upgrade, this.doUpgrade, this);

    },

    upgradeMotor: function() {
        this.type = "motor";
        this.upgrade = this.car.getUpgrade("motor");
        new UpgradeMessage(this.upgrade, this.doUpgrade, this);
    },

    upgradeSuspension: function() {
        this.type = "suspension";
        this.upgrade = this.car.getUpgrade("suspension");
        new UpgradeMessage(this.upgrade, this.doUpgrade, this);
    },

    upgradeTransmision: function() {
        this.type = "transmision";
        this.upgrade = this.car.getUpgrade("transmision");
        new UpgradeMessage(this.upgrade, this.doUpgrade, this);
    },

    // Empieza el juego
    start: function() {
        game.state.start('play');
    },
    
    // Vuelve atras
    back: function() {
        game.state.start('mapas');
    },

    // Vuelve al menu inicial
    home: function(){
        game.state.start('menu');
    },

    // Lleva a cabo la actualización
    doUpgrade: function() {
        var cost = this.upgrade.getCost();

        if ((game.global.player.getMoney() - cost) < 0)
            new InformativeMessage("No cuentas con suficiente dinero para realizar la\noperación.\n");

        else {
            var res = this.car.doUpgrade(this.upgrade);
            if (res == true) {
                game.global.player.updateMoney(-cost);           
                this.moneyLabel.text = game.global.player.getMoney();
                new InformativeMessage("Mejora realizada correctamente.\n");
            }
            else {
                if (this.upgrade.isComplete() == true)
                    new InformativeMessage("Has alcanzado el nivel máximo en esta mejora.\n");
                else
                    new InformativeMessage("Lo sentimos, la mejora no se pudo realizar en este\nmomento.\n");
            }
        }
    }
};