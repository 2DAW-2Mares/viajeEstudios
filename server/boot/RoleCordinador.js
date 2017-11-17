module.exports = function (app) {
    var Role = app.models.Role;

    Role.registerResolver('RolCordinador', function (role, context, cb) {
        // Q: Is the current request accessing a Project?
        if (context.modelName !== 'Centro') {
            // A: No. This role is only for projects: callback with FALSE
            return process.nextTick(() => cb(null, false));
        }

        //Q: Is the user logged in? (there will be an accessToken with an ID if so)
        var userId = context.accessToken.userId;
        if (!userId) {
            //A: No, user is NOT logged in: callback with FALSE
            return process.nextTick(() => cb(null, false));
        }

        // Q: Is the current logged-in user associated with this Project?
        // Step 1: lookup the requested project
        context.model.findById(context.modelId, function (err, centro) {
            // A: The datastore produced an error! Pass error to callback
            if (err)
                return cb(err);
            // A: There's no project by this ID! Pass error to callback
            if (!centro)
                return cb(new Error("Centro not found"));

            // Step 2: check if User is part of the Team associated with this Project
            // (using count() because we only want to know if such a record exists)
            var Centro = app.models.Centro;

            if (centro.verificado) {
                if (centro.coordinador == userId) {
                    return process.nextTick(() => cb(null, true));
                }
            } else {
                return process.nextTick(() => cb(null, false));
            }


        });
    });
};
