/*************************/
/* CLASE CAR
/*
/* Módulo encargado de la gestión de los coches
/*
/*************************/

/** 
* Constructor de la clase
*
* @Param propeties: estructura con las propiedades del coche.
* @Param upgrades: estructura con las mejoras.
*
*/
function Car(properties, upgrades) {  
    this.properties = properties;
    this.upgrades = upgrades;

    this.num_upgrades_frenos = 0;
    this.num_upgrades_motor = 0;
    this.num_upgrades_suspension = 0;
    this.num_upgrades_transmision = 0;
    this.total_upgrades = 4;
    
}
Car.prototype = Object.create(null);
Car.prototype.constructor = Car;


/* MÉTODOS DEL COCHE */
/**
* Lleva a cabo una actualización en el coche.
* 
* @Param upgrade: actualización a realizar.
*/
Car.prototype.doUpgrade = function (upgrade) {
    var res = upgrade.increaseUpgrade(this.upgrades.increase); // Comprobamos si se puede realizar la actualización
    if (res == false)
        return false;

    var percentage = upgrade.getPercentage() / 100;
    if (upgrade instanceof UpgradeFrenos){
        this.properties.breaking_power += (this.properties.breaking_power * percentage);
    } 
    else if (upgrade instanceof UpgradeMotor){        
        this.properties.max_front_speed += (this.properties.max_front_speed*percentage);
        this.properties.max_rear_speed += (this.properties.max_rear_speed*percentage); 
    } 
    else if (upgrade instanceof UpgradeSuspension){
        this.properties.damping += (this.properties.damping*percentage); 
    } 
    else if (upgrade instanceof UpgradeTransmision){
        this.properties.front_aceleration += (this.properties.front_aceleration*percentage); 
        this.properties.rear_aceleration += (this.properties.rear_aceleration*percentage); 
    } 
    else
        return false;

    return true;
}

/**
* Devuelve el valor de la propiedad especificada, en caso de no existir devuelve null
*/
Car.prototype.get = function(propertie) {
    switch (propertie) {
        case 'id':
            return this.properties.id;
        case 'name':
            return this.properties.name;

        case 'car':
            return this.properties.car;

        case 'wheel':
            return this.properties.wheel;

        case 'rectangle_l':
            return this.properties.rectangle_l;

        case 'rectangle_a':
            return this.properties.rectangle_a;

        case 'circle_c':
            return this.properties.circle_c;

        case 'rueda_c':
            return this.properties.rueda_c;

        case 'sus1':
            return this.properties.sus1;

        case 'sus2':
            return this.properties.sus2;

        case 'sus3':
            return this.properties.sus3;

        case 'sus4':
            return this.properties.sus4;

        case 'sus5':
            return this.properties.sus5;

        case 'cd':
            return this.properties.cd;

        case 'ct':
            return this.properties.ct;

        case 'cc':
            return this.properties.cc;

        case 'max_front_speed':
            return this.properties.max_front_speed;

        case 'max_rear_speed':
            return this.properties.max_rear_speed;

        case 'front_aceleration':
            return this.properties.front_aceleration;

        case 'rear_aceleration':
            return this.properties.rear_aceleration;

        case 'breaking_power':
            return this.properties.breaking_power;

        case 'damping':
            return this.properties.damping;

        default:
            return null;
    }
};

/*
* Obtiene la mejora que se corresponde al tipo type
*/
Car.prototype.getUpgrade = function (type) {
    switch (type) {
        case "frenos":
            return this.upgrades.frenos;

        case "motor":
            return this.upgrades.motor;

        case "suspension":
            return this.upgrades.suspension;

        case "transmision":
            return this.upgrades.transmision;

        default:
            return null;
    }
};


/* SUBCLASES PARA LOS COCHES */

function CarChico () {    
    var upgradeFrenos = new UpgradeFrenos(4);
    var upgradeMotor = new UpgradeMotor(4);
    var upgradeSuspension = new UpgradeSuspension(3);
    var upgradeTransmision = new UpgradeTransmision(3); 

    var properties = {
        id: 0,
        name: 'conductor',
        wheel: 'rueda',
        car: 'coche',
        
        rectangle_l: 141,
        rectangle_a: 40,
        circle_c: 30,
        rueda_c: 25,
        sus1: 100,
        sus2: 600,
        sus3: 100,
        sus4: [40,0],
        sus5: [-40,0],
        cd: [50,0],
        ct: [-50,0],
        cc: [-15,-50],

        max_front_speed: 800,
        max_rear_speed: 400,
        front_aceleration: 30,
        rear_aceleration: 10,
        breaking_power: 10,
        damping: 100
    };

    var upgrades = {
        frenos: upgradeFrenos,
        motor: upgradeMotor,
        suspension: upgradeSuspension,
        transmision: upgradeTransmision, 
        increase: 50 // Incremento del precio de la actualización
    };
    

    Car.call(this, properties, upgrades);
}
// subclase extiende superclase
CarChico.prototype = Object.create(Car.prototype);
CarChico.prototype.constructor = CarChico;

function CarChica () {
    var upgradeFrenos = new UpgradeFrenos(4);
    var upgradeMotor = new UpgradeMotor(4);
    var upgradeSuspension = new UpgradeSuspension(2);
    var upgradeTransmision = new UpgradeTransmision(3);

    var properties = {
        id: 1,
        name: 'conductora',
        wheel: 'rueda_chica',
        car: 'coche_chica',
        
        rectangle_l: 135,
        rectangle_a: 40,
        circle_c: 25, 
        rueda_c: 18,
        sus1: 40,
        sus2: 200,
        sus3: 100,
        sus4: [10,0],
        sus5: [-10,0],
        cd: [30,0],
        ct: [-37,0],
        cc: [-14,-28], 

        max_front_speed: 500,
        max_rear_speed: 200,
        front_aceleration: 20,
        rear_aceleration: 10,
        breaking_power: 5,
        damping: 100
    };

    var upgrades = {
        frenos: upgradeFrenos,
        motor: upgradeMotor,
        suspension: upgradeSuspension,
        transmision: upgradeTransmision, 
        increase: 50
    };
    
    Car.call(this, properties, upgrades);
}
CarChica.prototype = Object.create(Car.prototype);
CarChica.prototype.constructor = CarChica;

function CarOrco () {
    var upgradeFrenos = new UpgradeFrenos(4);
    var upgradeMotor = new UpgradeMotor(4);
    var upgradeSuspension = new UpgradeSuspension(3);
    var upgradeTransmision = new UpgradeTransmision(3);

    var properties = {
        id: 2,
        name: 'conductor_orco',
        wheel: 'rueda_orco',
        car: 'coche_orco',
        
        rectangle_l: 180,
        rectangle_a: 60,
        circle_c: 45, 
        rueda_c: 38,
        sus1: 100,
        sus2: 600,
        sus3: 100,
        sus4: [40,0],
        sus5: [-40,0],
        cd: [50,0],
        ct: [-55,0],
        cc: [-20,-60],

        max_front_speed: 900,
        max_rear_speed: 500,
        front_aceleration: 40,
        rear_aceleration: 20,
        breaking_power: 10,
        damping: 50
    };

    var upgrades = {
        frenos: upgradeFrenos,
        motor: upgradeMotor,
        suspension: upgradeSuspension,
        transmision: upgradeTransmision, 
        increase: 150
    };
    

    Car.call(this, properties, upgrades);
}
CarOrco.prototype = Object.create(Car.prototype);
CarOrco.prototype.constructor = CarOrco;
