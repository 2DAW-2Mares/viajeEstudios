'use strict';
var _ = require('lodash');

module.exports = function (Centro) {
    Centro.validatesNumericalityOf('codigocentro', {int: true, message: 'Debe ser un número sin decimales'});
    Centro.validatesUniquenessOf('codigocentro', {message: 'Ese centro ya existe'});

    Centro.beforeRemote('create', function (context, centro, next) {
        delete context.args.data.verificado;
        context.args.data.coordinador = context.req.accessToken.userId;
        next();
    });
  
    Centro.beforeRemote('find', function(context, centro, next) {
        var app = Centro.app;
        var RoleMapping = app.models.RoleMapping;
        var todosCentros = false;
        if (context.req.accessToken && context.req.accessToken.userId) {
            RoleMapping.findOne({
                where: {
                    and: [{
                        principalType: 'USER'
                    }, {
                        principalId: context.req.accessToken.userId
                    }]
                },
                include: {
                    relation: 'role',
                    scope: {
                        where: {
                            name: app.get('admin_role')
                        }
                    }
                }
            }, function(err, rolemapping) {
                if (err) next(err);
                if (rolemapping) {
                    todosCentros = true;

                }
                if (!todosCentros) {
                    context.args.filter = Centro.addVerificadoFilter(context.args.filter);
                }
                next();
            })
        } else {
            context.args.filter = Centro.addVerificadoFilter(context.args.filter);
            next();
        }
    });

    Centro.addVerificadoFilter = function(filter) {
        if (filter) {
            var filterJSON = filter;
            filterJSON.where = {
                "and": [{
                    "verificado": true
                }, filterJSON.where]
            };
            filter = filterJSON;
        } else {
            filter = {
                where: {
                    "verificado": true
                }
            };
        }
        return filter;
    }

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
