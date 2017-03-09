/***************/
/*
/* CLASE MENSSAGE
/* Módulo que incluye funciones para mostrar información o mensajes por pantalla.
/*
/***************/

/**
* Crea una nueva 'ventana' con el mensaje de una mejoras
* @Param upgrade: objeto Upgrade
* @Param callbackAccept: funcion a ejecutarse cuando se hace click en el boton aceptar
* @Param context: contexto de la llamada al callbackAccept
*/
function UpgradeMessage(upgrade, callbackAccept, context) {
    var message = upgrade.getDescription();

    var areaCamara = game.add.bitmapData(game.camera.width, game.camera.height);
    areaCamara.fill(0, 0, 0, 0.5);

    var spriteArea = game.add.sprite(0, 0, areaCamara);
    spriteArea.fixedToCamera = true;

    var popUp = game.add.image(game.camera.width/2, game.camera.height/2, 'popUp');
    popUp.anchor.setTo(0.5, 0.5);

    var fuente = { font: '18px Arima Madurai', fill: '#965702', align: 'justify'}; 
    var txt = game.add.text(48-popUp.width/2, 45-popUp.height/2, message, fuente);
    popUp.addChild(txt);

    var buttonUpgrade, buttonCancel;

    buttonUpgrade = game.add.button(-100, popUp.height-100, "mejorar", callbackAccept, context);
    buttonUpgrade.scale.setTo(0.33, 0.33);
    buttonUpgrade.anchor.setTo(0.5, 0.5);
    popUp.addChild(buttonUpgrade);

    var callbackCancel = function () {
        this.destroy();
        areaCamara.destroy();
    };

    var contextoCancelar = spriteArea;

    buttonCancel = game.add.button(100, popUp.height-100, "cancelar", callbackCancel, contextoCancelar);
    buttonCancel.scale.setTo(0.33, 0.33);
    buttonCancel.anchor.setTo(0.5, 0.5);
    popUp.addChild(buttonCancel);

    spriteArea.addChild(popUp);

    var popUpTween = game.add.tween(popUp.scale);
    popUpTween.from({x:0.05, y:0.05}, 150, Phaser.Easing.Linear.None);
    popUpTween.start();

}

UpgradeMessage.prototype = Object.create(null);
UpgradeMessage.prototype.constructor = UpgradeMessage;

/*
* Crea una nueva ventana con un determinado mesaje.
* @Param message: mensaje a mostrar
*/
function InformativeMessage (message) {
    var areaCamara = game.add.bitmapData(game.camera.width, game.camera.height);
    areaCamara.fill(0, 0, 0, 0.5);

    var spriteArea = game.add.sprite(0, 0, areaCamara);
    spriteArea.fixedToCamera = true;

    var popUp = game.add.image(game.camera.width/2, game.camera.height/2, 'popUp');
    popUp.anchor.setTo(0.5, 0.5);

    var fuente = { font: '18px Arima Madurai', fill: '#965702', align: 'center'}; 
    var txt = game.add.text(60-popUp.width/2, 70-popUp.height/2, message, fuente);
    popUp.addChild(txt);

    var callbackAccept = function () {
        this.destroy();
        areaCamara.destroy();
    };

    var contextAccept = spriteArea;
    buttonAccept = game.add.button(0, popUp.height-100, "aceptar", callbackAccept, contextAccept);
    buttonAccept.scale.setTo(0.33, 0.33);
    buttonAccept.anchor.setTo(0.5, 0.5);
    popUp.addChild(buttonAccept);

    spriteArea.addChild(popUp);


}
InformativeMessage.prototype = Object.create(null);
InformativeMessage.prototype.constructor = InformativeMessage;
