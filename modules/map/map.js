/*************************/
/* CLASE MAP
/*
/* Módulo encargado de la gestión de los mapas para los distintos niveles
/*
/*************************/

/** 
 * Constructor de la clase
 *
 * @Param propeties: estructura con las propiedades del coche.
 * @Param upgrades: estructura con las mejoras.
 *
 */
function Map(id) {
    this.map = this.loadMap(id);
}
Map.prototype = Object.create(null);
Map.prototype.constructor = Map;


Map.prototype.getProperties = function() {
    return this.map;
}

/**
 * Devuelve las propiedades del mapa que se corresponda con ID.
 * 
 * @Param id: identificador del mapa.
 *
 * @Return Estructura con las propiedades del mapa.
 */
Map.prototype.loadMap = function(id) {
    var map;
    switch (id) {
        case 1:
            map = {
                id: 1,
                name: "Campo",
                tilesetImage: "mapa1",
                tilemap: "mapa_1",
                layer: "layer_mapa1",
                gravity: 1500,
                height: 640,
                width: 4160,
                background: "cielo_movil"
            };
            return map;

        case 2:
            map = {
                id: 2,
                name: "Cueva",
                tilesetImage: "mapa2",
                tilemap: "mapa_2",
                layer: "layer_mapa2",
                gravity: 1600,
                height: 800,
                width: 6400,
                background: "cueva"
            };
            return map;

        case 3:
            map = {
                id: 3,
                name: "Luna",
                tilesetImage: "mapa3",
                tilemap: "mapa_3",
                layer: "layer_mapa3",
                gravity: 450,
                height: 960,
                width: 32000,
                background: "luna"
            };
            return map;

        default:
            map = {
                id: 1,
                name: "Campo",
                tilesetImage: "mapa1",
                tilemap: "mapa_1",
                layer: "layer_mapa1",
                gravity: 1500,
                height: 640,
                width: 4160,
                background: "cielo_movil"
            };
            return map;
    }
}