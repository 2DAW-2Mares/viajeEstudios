'use strict';

module.exports = function(Centro) {
	Centro.validatesNumericalityOf('codigocentro', {int: true, message: 'Debe ser un número sin decimales'});
	Centro.validatesUniquenessOf('codigocentro', {message: 'Ese centro ya existe'});
};
