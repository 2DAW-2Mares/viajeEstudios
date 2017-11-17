module.exports = function (app) {
    var Role = app.models.Role;

    Role.registerResolver('RolCordinador', function (role, context, cb) {
        // Comprobamos a que centro esta haciendo la peticion
        if (context.modelName !== 'Centro') {
            // Si esta accediento a otro metodo que no sea Centro no seguimos
            return process.nextTick(() => cb(null, false));
        }
        //Vamos a comprovar si hay algun usuario loggeado
        var userId = context.accessToken.userId;
        if (!userId) {
            //Si no esta logeado no puede usar la funcion por lo tanto no seguimos
            return process.nextTick(() => cb(null, false));
        }
        //vamos a comprobar si el centro esta verificado y si el coordinador del centro es el que hace la peticion
        var Cent = app.models.Centro;
        Cent.count({
            coordinador: userId,
            verificado: true
        }, function (err, count) {
            if (err)
                return cb(err);
            if (count > 0) {
                return cb(null, true);
            } else {
                return cb(null, false);
            }
        });


    });
};
