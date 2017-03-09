/**
* CLASE UPGRADE
* Módulo que incluye funciones útiles para las actualizaciones
*/

/**
* Constructor de la clase 
* 
* @Param cost: coste de la actualización
* @Param total_upgrades: número maximo de la actualización
* @Param description: descripción de la actualización
* @Param percentage: porcentaje en que se mejora
*/
function Upgrade (cost, total_upgrades, description, percentage) {
    this.cost = cost;
    this.num_upgrades = 0;
    this.total_upgrades = total_upgrades;
    this.description = description;
    this.percentage = percentage;
}

Upgrade.prototype = Object.create(null);
Upgrade.prototype.constructor = Upgrade;


/* MÉTODOS DE LA CLASE*/
/**
* Incrementa el nivel y coste de la mejora.
* @Param increase: cantidad en la que aumenta el coste de la mejora.
*/
Upgrade.prototype.increaseUpgrade = function (increase) {
    if (this.num_upgrades == this.total_upgrades)
        return false;

    this.cost += increase;
    this.num_upgrades++;
    return true;
}

/*
* Comprueba si se ha llegado el nivel maximo de actualización.
* @Return true si se ha llegado al máximo, false en caso contrario.
*/
Upgrade.prototype.isComplete = function () {
    if (this.num_upgrades == this.total_upgrades)
        return true;
    return false;
}

/* Geters */

Upgrade.prototype.getDescription = function () {
    var info_cost = "\nCosto de actualización: $"+this.cost;
    var info_upgrade = "\nMejora "+this.num_upgrades+"/"+this.total_upgrades+": "+this.percentage+"%";

    return this.description+info_cost+info_upgrade;
}

Upgrade.prototype.getPercentage = function () {
    return this.percentage;
}

Upgrade.prototype.getCost = function () {
    return this.cost;
}

Upgrade.prototype.getNumUpgrades = function () {
    return this.num_upgrades;
}

/* SUBCLASES */

function UpgradeFrenos (total_upgrades) {    
    var cost = 300;
    var percentage = 20;
    var description = "Mejora general en el sistema de frenado.\n";

    Upgrade.call(this, cost, total_upgrades, description, percentage);
}
UpgradeFrenos.prototype = Object.create(Upgrade.prototype);
UpgradeFrenos.prototype.constructor = UpgradeFrenos;

function UpgradeMotor (total_upgrades) {
    var cost = 300;
    var percentage = 20;
    var description = "Las partes mejoradas del motor aumentan la potencia.\nMás caballos de fuerza te ayudan a subir cerros y\na lograr mejores saltos.\n";

    Upgrade.call(this, cost, total_upgrades, description, percentage);
}
UpgradeMotor.prototype = Object.create(Upgrade.prototype);
UpgradeMotor.prototype.constructor = UpgradeMotor;

function UpgradeSuspension (total_upgrades) {
    var cost = 500;
    var percentage = 5;
    var description = "Un punto de peso más bajo y una absorción mejorada\nde golpes aumenta la estabilidad en velocidades altas\ny le da más estabilidad al auto en baches.\n"

    Upgrade.call(this, cost, total_upgrades, description, percentage);
}
UpgradeSuspension.prototype = Object.create(Upgrade.prototype);
UpgradeSuspension.prototype.constructor = UpgradeSuspension;

function UpgradeTransmision (total_upgrades) {
    var cost = 200;
    var percentage = 8;
    var description = "Se logra una mejor tracción y control del vehículo.\n";

    Upgrade.call(this, cost, total_upgrades, description, percentage);
}
UpgradeTransmision.prototype = Object.create(Upgrade.prototype);
UpgradeTransmision.prototype.constructor = UpgradeTransmision;
