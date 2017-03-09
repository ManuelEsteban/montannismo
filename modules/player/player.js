/******************/
/* PLAYER
/* Módulo encargado de la gestión del jugador
/*
/*****************/

/**
* Constructor de la clase
*/
function Player() {
    this.money = 0;
    this.record = 0;
    this.cars = [];
    this.num_cars = 0;
}

Player.prototype = Object.create(null);
Player.prototype.constructor = Player;


/* MÉTODOS */

/**
* Crea el conjuto de coches que manejará el jugador
*/
Player.prototype.createCars = function () {
    this.cars[0] = new CarChico();
    this.cars[1] = new CarChica();
    this.cars[2] = new CarOrco();

    this.num_cars = this.cars.length;
}

/* METODOS*/
/* Actualiza el dinero del jugador*/
Player.prototype.updateMoney = function(increase) {
    if ((this.money + increase) < 0)
        return false;
    
    this.money += increase;
    return true;
}

/* Getters */
Player.prototype.getMoney = function() {
    return this.money;
}

Player.prototype.getRecord = function() {
    return this.record;
}

Player.prototype.getCarById = function (id) {
    return this.cars[id];
}

/* Setters*/
Player.prototype.setMoney = function(value) {
    this.money = value;
}

Player.prototype.setRecord = function(value) {
    this.record = value;
}

