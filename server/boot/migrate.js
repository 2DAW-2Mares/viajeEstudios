'use strict';

module.exports = function(app) {
    //data sources
    var mysqlDs = app.dataSources.mysqlDs;

    mysqlDs.automigrate([
        'Centro', 'DetallesPedido', 'Ingreso', 'Objetivo', 'Pedido', 
        'Producto', 'Proveedor', 'TipoProducto', 'Usuario', 'ObjetivoUsuario'
    ], function (err) {
        if (err) console.log(err);
        console.log('> Models migrated to tables');
    });
}