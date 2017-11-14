'use strict';

module.exports = function (Centro) {
    Centro.validatesNumericalityOf('codigocentro', {int: true, message: 'Debe ser un número sin decimales'});
    Centro.validatesUniquenessOf('codigocentro', {message: 'Ese centro ya existe'});

    Centro.beforeRemote('create', function (context, centro, next) {
        delete context.args.data.verificado;
        context.args.data.coordinador = context.req.accessToken.userId;
        next();
    });

    Centro.afterRemote('create', function (context, centro, next) {
        var options = {
            type: 'email',
            to: process.env.ADMIN_EMAIL,
            from: process.env.EMAIL_USER,
            subject: 'Alta de centro pendiente de validación',
            html: "Centro pendiente de validación"
        };

        Centro.app.models.Email.send(options, function (err) {
            if (err)
                return console.log('> error sending verificación de centro al admin');
            console.log('> enviando verificación de centro al admin:');
        });
        next();
    });

    /**
     * Va a cambiar el estado de verificado de un centro solo lo podra usar el admin
     * @param {Function(Error, object)} callback
     */

    Centro.prototype.verifycado = function (callback) {
   
        this.verificado = true;
        this.save();      
        callback(null, this);
    };


};
