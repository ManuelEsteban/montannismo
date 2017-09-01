var playState = {

    create: function() {
        game.physics.p2.defaultRestitution = 0.8;

        /* COCHE Y MUNDO */
        this.createWorld();
        this.createCar();
        this.createCoins();
        this.createGas();
        game.physics.p2.setImpactEvents(true); // Para permitir la llamada a los callbaks

        /* ELEMENTOS DE PANTALLA */
        game.global.score = 0;
        this.coinIcon = game.add.image(20, 15, 'coinIcon');
        this.coinIcon.fixedToCamera = true;
        this.gasIcon = game.add.image(20, 55, 'gasIcon');
        this.gasIcon.fixedToCamera = true;
        this.puntuacionLabel = game.add.text(this.coinIcon.x + 32, this.coinIcon.y + 3, ' 0', {
            font: '18px Arial',
            fill: '#ffffff'
        });
        this.puntuacionLabel.fixedToCamera = true;

        // Code for pause menu //
        this.pause_label = this.game.add.button(game.camera.width - 150, 20, 'gasIcon', function(){
            game.paused = true;
            //this.pauseToggle.visible = false;
            this.menu = game.add.sprite(game.camera.width/2, game.camera.height/2, 'menuPause');
            this.menu.anchor.setTo(0.5, 0.5);
            this.menu.fixedToCamera = true;
            //this.menuBackground.visible = true;
            
        }, this);
        this.pause_label.fixedToCamera = true;

        // Add a input listener that can help us return from being paused
        game.input.onDown.add(this.unpause, self);


        // Sound        
        this.botonSonido = game.add.button(game.camera.width - 130, 20, 'sonido', this.gestionarSonido, this);
        this.botonSonido.input.useHandCursor = true;
        if (game.sound.mute)
            this.botonSonido.frame = 1;
        this.botonSonido.fixedToCamera = true;

        // Full screen
        this.pantallaCompleta = game.add.image(game.camera.width - 80, 8, 'fullscreen');
        this.pantallaCompleta.fixedToCamera = true;
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

        /* COMBUSTIBLE 
        /* bmd(withd, height): Canvas que va a contener la barra de combustible */
        // Fondo de la barra de combustible
        var bmd = game.add.bitmapData(200, 28);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 200, 28);
        bmd.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        bmd.ctx.strokeRect(0, 0, bmd.width, bmd.height);
        bmd.ctx.fill();
        this.bg_gas = game.add.sprite(this.gasIcon.x + 40, this.gasIcon.y + 2, bmd);
        this.bg_gas.fixedToCamera = true;

        // Relleno de la barra de combustible
        this.gasBar = game.add.bitmapData(190, 30);
        this.gasBar.ctx.beginPath();
        this.gasBar.ctx.rect(0, 0, 200, 20);
        this.gasBar.ctx.fillStyle = '#00f910';
        this.gasBar.ctx.fill();
        this.actual_gas = new Phaser.Rectangle(0, 0, this.gasBar.width, this.gasBar.height);
        this.total_gas = this.gasBar.width;
        this.gas = this.game.add.sprite(this.gasIcon.x + 45, this.gasIcon.y + 6, this.gasBar);
        this.gas.fixedToCamera = true;

        // Con esto permitimos actualizar el combustible
        this.gas.cropEnabled = true;
        this.gas.crop(this.actual_gas);
        this.game.time.events.loop(500, this.updateGas, this); // Cada 0.5 segundos se actualiza


        /* SONIDOS */
        this.music = game.add.audio('prueba');
        this.music.volume = 0.4;
        this.music.loopFull(0.4);
        this.music.play();
        this.carSound = game.add.audio('marcha');
        this.carSound.volume = 0.1;
        this.coinSound = game.add.audio('coinSound');
        this.coinSound.volume = 0.6;
        this.gasSound = game.add.audio('gasSound');
        this.gasSound.volume = 0.6;
        this.gasLowSound = game.add.audio('gasLowSound');
        this.gasLowSound.volume = 0.6;


        //this.cursor2 = game.input.keyboard.addKeys({'space': Phaser.Keyboard.SPACEBAR});
        this.cursor = game.input.keyboard.createCursorKeys();
        game.camera.follow(this.carBody);
    },


    update: function() {
        //this.hills.x = game.camera.x * 0.2;
        this.fondo_movil.x = game.camera.x * 0.2;
        this.moveCar();
        this.gas.updateCrop();
        if (this.carBody.x >= this.mapa.objects['meta'][0].x) {
            this.gameOk();
        }
    },

    moveCar: function() {
        var speed = this.rueda_delantera.body.velocity.x;
        var max_front_speed = this.car.get('max_front_speed');
        var max_rear_speed = this.car.get('max_rear_speed');
        var front_aceleration = this.car.get('front_aceleration');
        var rear_aceleration = this.car.get('rear_aceleration');
        var breaking_power = this.car.get('breaking_power');

        if (this.cursor.left.isDown) {
            this.carSound.play();
            // Velocidad maxima 
            if (speed <= -max_rear_speed) {
                this.rueda_delantera.body.velocity.x = -max_rear_speed;
                this.rueda_trasera.body.velocity.x = -max_rear_speed;
            }
            // Se aumenta la velocidad (aceleración)
            else {
                this.rueda_delantera.body.velocity.x -= rear_aceleration;
                this.rueda_trasera.body.velocity.x -= rear_aceleration;
            }
        } else if (this.cursor.right.isDown) {
            this.carSound.play();
            // Velocidad maxima 
            if (speed >= 800) {
                this.rueda_delantera.body.velocity.x = max_front_speed;
                this.rueda_trasera.body.velocity.x = max_front_speed;
            }
            // Se aumenta la Velocidad (aceleración)
            else {
                this.rueda_delantera.body.velocity.x += front_aceleration;
                this.rueda_trasera.body.velocity.x += front_aceleration;
            }
        }
        // Frenar
        else if (this.cursor.down.isDown) {
            if (this.rueda_delantera.body.velocity.x > 0) {
                this.rueda_delantera.body.velocity.x -= breaking_power;
                this.rueda_trasera.body.velocity.x -= breaking_power;
            } else {
                this.rueda_delantera.body.velocity.x += breaking_power;
                this.rueda_trasera.body.velocity.x += breaking_power;
            }
        } else {
            this.rueda_delantera.body.inertia = 80;
            this.rueda_trasera.body.inertia = 80;
        }
    },

    /*
     * FUNCIÓN PARA CREAR EL MUNDO 
     * Crea el mundo y sus colisiones
     */
    createWorld: function() {
        var map = new Map(game.global.map_id);
        var map_properties = map.getProperties();

        // Fondo
        // this.hills = game.add.tileSprite(0,0,4160,640,'hills'); 
        //this.fondo_movil = game.add.tileSprite(0,0,4160,640, map_properties.background);
        this.fondo_movil = game.add.tileSprite(0, 0, map_properties.width, map_properties.height, map_properties.background);
        //this.fondo_movil.fixedToCamera = true;

        // Mapa
        /*this.mapa = game.add.tilemap('mapa');
        this.mapa.addTilesetImage('tileset');
        
        this.layer = this.mapa.createLayer('mapa2');
        this.layer.resizeWorld();
        this.layer_colision = this.mapa.createLayer('colision');
        this.layer_colision.resizeWorld();
 
        this.mapa.setCollisionBetween(1,256);
        game.physics.p2.convertTilemap(this.mapa, this.layer);
        game.physics.p2.convertTilemap(this.mapa, this.layer_colision);
       
        this.layerobjects_tiles = game.physics.p2.convertCollisionObjects(this.mapa,'polilineas');
        var anchura = this.layer.width * this.layer.tilewidth;
        var altura = this.layer.height * this.layer.tileheight;
        game.physics.p2.setBounds(0, 0, anchura, altura,true, true, true, true, false);*/

        this.mapa = game.add.tilemap(map_properties.tilemap);
        this.mapa.addTilesetImage(map_properties.tilesetImage);
        this.layer = this.mapa.createLayer(map_properties.layer);
        this.layer.resizeWorld();

        // Polilineas
        this.layerobjects_tiles = game.physics.p2.convertCollisionObjects(this.mapa, 'polilineas');

        // Atributos del mapa
        var anchura = this.layer.width * this.layer.tilewidth;
        var altura = this.layer.height * this.layer.tileheight;
        game.physics.p2.setBounds(0, 0, anchura, altura, true, true, true, true, false);
        game.physics.p2.gravity.y = map_properties.gravity;
    },

    /*
     * FUNCIÓN PARA CREAR EL COCHE 
     */
    createCar: function() {
        this.car = game.global.player.getCarById(game.global.car_id);

        this.carBody = game.add.sprite(100, 100, this.car.get('car'));
        this.carBody.anchor.setTo(0.5, 0.5);
        this.conductor = game.add.sprite(50, 50, this.car.get('name'));
        this.rueda_delantera = game.add.sprite(140, 130, this.car.get('wheel'));
        this.rueda_trasera = game.add.sprite(60, 130, this.car.get('wheel'));

        game.physics.p2.enable([this.rueda_delantera, this.rueda_trasera, this.conductor, this.carBody]);

        // Propiedades comunes // 
        // CAR BODY
        this.carBody.body.debug = false; // si esta a true se ve en donde se dibuja el rectangulo
        this.carBody.body.mass = 2;

        // CONDUCTOR
        this.conductor.body.debug = false;
        this.conductor.body.mass = 0.01;
        if (this.car.get('id') == 1) // en el caso de la chica 
            this.conductor.anchor.setTo(0.7, 0.6);

        // RUEDAS
        this.rueda_delantera.body.debug = false; // si esta a true se ve en donde se dibuja el circulo
        this.rueda_delantera.body.mass = 15;
        this.rueda_trasera.body.debug = false;
        this.rueda_trasera.body.mass = 15;

        var constraint_delantera;
        var constraint_trasera;
        var constraint_cabeza;


        // SUSPENSIÓN DEL COCHE: Spring(bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB)
        // LIMITACIONES PrismaticConstraint(bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce)

        this.carBody.body.setRectangle(this.car.get('rectangle_l'), this.car.get('rectangle_a')); // rectangulo con las dimensiones
        this.conductor.body.setCircle(this.car.get('circle_c'));

        this.rueda_delantera.body.setCircle(this.car.get('rueda_c')); // circulo con el diametro
        this.rueda_trasera.body.setCircle(this.car.get('rueda_c'));

        // Supension
        this.suspension_delantera = game.physics.p2.createSpring(this.carBody, this.rueda_delantera, this.car.get('sus1'), this.car.get('sus2'), this.car.get('damping'), null, null, this.car.get('sus4'), null);
        this.suspension_trasera = game.physics.p2.createSpring(this.carBody, this.rueda_trasera, this.car.get('sus1'), this.car.get('sus2'), this.car.get('damping'), null, null, this.car.get('sus5'), null);
        // Limitaciones
        constraint_delantera = game.physics.p2.createPrismaticConstraint(this.carBody, this.rueda_delantera, false, this.car.get('cd'), [0, 0], [0, 10]);
        constraint_trasera = game.physics.p2.createPrismaticConstraint(this.carBody, this.rueda_trasera, false, this.car.get('ct'), [0, 0], [0, 10]);
        constraint_cabeza = game.physics.p2.createPrismaticConstraint(this.carBody, this.conductor, true, this.car.get('cc'), [0, 0], [0, 1]);

        constraint_delantera.lowerLimitEnabled = constraint_delantera.upperLimitEnabled = true;
        constraint_delantera.upperLimit = -1;
        constraint_delantera.lowerLimit = -8;
        constraint_trasera.lowerLimitEnabled = constraint_trasera.upperLimitEnabled = true;
        constraint_trasera.upperLimit = -1;
        constraint_trasera.lowerLimit = -8;
        constraint_cabeza.lowerLimitEnabled = constraint_cabeza.upperLimitEnabled = true;
        constraint_cabeza.upperLimit = 1;
        constraint_cabeza.lowerLimit = 1;

        // Añadimos colision con las polilineas
        for (var i = 0; i < this.layerobjects_tiles.length; i++)
            this.conductor.body.createBodyCallback(this.layerobjects_tiles[i], this.playerDie, this);

        this.carBody.data.gravityScale = 1;
    },

    /*
     * FUNCIÓN PARA COLOCAR LAS MONEDAS EN EL MAPA 
     */
    createCoins: function() {
        var monedas = new Array();
        for (var i = 0; i < this.mapa.objects['monedas'].length; i++) {
            monedas[i] = game.add.sprite(this.mapa.objects['monedas'][i].x, this.mapa.objects['monedas'][i].y, "moneda");
            game.physics.p2.enable(monedas[i]);
            monedas[i].body.setCircle(15);
            monedas[i].body.static = true;
            monedas[i].body.mass = 0;
            monedas[i].animations.add('turn');
            monedas[i].animations.play('turn', 30, true);

            // Añadimos los callback para cuando se encuentre con las monedas
            this.rueda_delantera.body.createBodyCallback(monedas[i], this.takeCoin, this);
            this.rueda_trasera.body.createBodyCallback(monedas[i], this.takeCoin, this);
            this.carBody.body.createBodyCallback(monedas[i], this.takeCoin, this);
            this.conductor.body.createBodyCallback(monedas[i], this.takeCoin, this);
        }
    },

    /*
     * FUNCIÓN LLAMADA AL RECOGER UNA MONEDA
     */
    takeCoin: function(body1, body2) {
        game.global.score += 5;
        body2.sprite.kill();
        this.puntuacionLabel.text = ' ' + game.global.score;
        this.coinSound.play();
    },

    /*
     * FUNCIÓN PARA COLOCAR EL COMBUSTIBLE EN EL MAPA 
     */
    createGas: function() {
        var gas = new Array();
        for (var i = 0; i < this.mapa.objects['combustible'].length; i++) {
            gas[i] = game.add.sprite(this.mapa.objects['combustible'][i].x, this.mapa.objects['combustible'][i].y, "combustible");
            game.physics.p2.enable(gas[i]);
            gas[i].body.setRectangle(39, 44);
            gas[i].body.static = true;

            // Añadimos los callback para cuando se encuentre con el combustible
            this.rueda_delantera.body.createBodyCallback(gas[i], this.takeGas, this);
            this.rueda_trasera.body.createBodyCallback(gas[i], this.takeGas, this);
            this.carBody.body.createBodyCallback(gas[i], this.takeGas, this);
            this.conductor.body.createBodyCallback(gas[i], this.takeGas, this);
        }
    },

    /*
     * FUNCIÓN LLAMADA AL RECOGER COMBUSTIBLE
     */
    takeGas: function(body1, body2) {
        this.gasSound.play();
        this.actual_gas.width = this.total_gas;
        body2.sprite.kill();
    },

    /*
     * FUNCIÓN PARA ACTUALIZAR LA BARRA DE COMBUSTIBLE
     */
    updateGas: function() {
        if (this.actual_gas.width <= 0) {
            this.gameOver();
        } else {
            this.game.add.tween(this.actual_gas).to({
                width: (this.actual_gas.width - (this.total_gas / 100))
            }, 200, Phaser.Easing.Linear.None, true);
        }
        // Mostramos alerta cuando el nivel de combustible es bajo
        if ((this.actual_gas.width >= (this.total_gas / 4) - 5) && (this.actual_gas.width <= (this.total_gas / 4) + 5)) {
            this.gasLowSound.play();
            var fuelLow = game.add.sprite((game.camera.width / 2), (game.camera.height / 2), 'fuelLow');
            fuelLow.fixedToCamera = true;
            fuelLow.anchor.setTo(0.5, 0.5);
            fuelLow.alpha = 0;
            game.add.tween(fuelLow).to({
                alpha: 0.6
            }, 1000).to({
                alpha: 0
            }, 1000).start();
        }
    },

    /*
     * FUNCIÓN PARA BOTONES DE MUTE/UNMUTE 
     * Activa o desactiva el sonido
     */
    gestionarSonido: function() {
        game.sound.mute = !game.sound.mute;
        if (game.sound.mute) 
            this.botonSonido.frame = 1;
        else 
            this.botonSonido.frame = 0;
    },

    /*
     * FUNCIÓN PARA MENU DE PAUSA 
     * Controla el funcionamiento del menu de pausa
     */
    unpause: function(event) {
        if (game.paused) {
            var x = event.x, y = event.y;
            console.log("x: "+x);
            console.log("y: "+y);


            // Calculate the corners of the menu
            var restartX_ini = 426,
                restartY_ini = 166, 
                restartX_end = 620,
                restartY_end = 213;

            var exitX_ini = 474,
                exitY_ini = 309,
                exitX_end = 561,
                exitY_end = 355;

            if (x > restartX_end && x < restartX_ini && y > restartY_end && y < restartY_ini) {
                //TODO: restart function
                console.log("restart function");
            } else if (x > exitX_end && x < exitX_ini && y > exitY_end && y < exitY_ini) {
                this.music.stop();
                game.paused = false;
                game.state.start('menu');
            } else {
                this.menu.destroy();
                game.paused = false;
            }
        }
    },

    playerDie: function() {
        game.time.events.add(300, this.gameOver, this);
    },

    gameOver: function() {
        label = game.add.text(game.camera.width / 2, game.camera.height / 2, '\nGAME OVER\n', {
            font: '22px Lucida Console',
            fill: '#fff',
            align: 'center'
        });
        label.fixedToCamera = true;
        game.global.updateMoney = true;
        this.carSound.stop();
        this.music.stop();
        game.time.events.add(1000, this.startMenu, this); // Despues de 1 segundo pasa a la pantalla de menu
    },
    gameOk: function() {
        //label = game.add.text(game.camera.width  / 2 , game.camera.height  / 2, '\nYOU WIN!!!\n',{ font: '40px Lucida Console', fill: '#fff', align: 'center'});
        //label.fixedToCamera = true;
        var youWin = game.add.sprite((game.camera.width / 2), (game.camera.height / 2), 'youWin');
        youWin.fixedToCamera = true;
        youWin.anchor.setTo(0.5, 0.5);
        youWin.alpha = 0;
        game.add.tween(youWin).to({
            alpha: 0.6
        }, 1000).to({
            alpha: 0
        }, 1000).start();
        game.global.updateMoney = true;
        this.carSound.stop();
        this.music.stop();
        game.time.events.add(1000, this.startMenu, this); // Despues de 1 segundo pasa a la pantalla de menu
    },

    startMenu: function() {
        game.state.start('menu');
    },

};