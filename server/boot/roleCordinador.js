module.exports = function (app) {
  var Role = app.models.Role;

  Role.registerResolver('roleCordinador', function (role, context, cb) {


    if (context.modelName !== 'Centro') {
      return process.nextTick(() => cb(null, false));
    }

    var userId = context.accessToken.userId;
    if (!userId) {
      return process.nextTick(() => cb(null, false));
    }

//Con findByID

   // context.model.findById(context.modelId, function (err, centro) {
     // if(err) return cb(err);
     // if(!centro) return cb(new Error("Centro not found"));

    // if (userId==centro.coordinador){
     // if (centro.verificado){
       // return process.nextTick(() => cb(null, true));
       //}else{
       // return process.nextTick(() => cb(null, false));
      // }
      // }else{
       // return process.nextTick(() => cb(null, false));
      // }
     // });

//Con Count

    context.model.count({
      coordinador: userId,
      verificado: true
    }, function (err, count) {

      if (err) return process.nextTick(() => cb(null, false));
      
              if(count > 0){
                return process.nextTick(() => cb(null, true));
              }
      
          else{
            return process.nextTick(() => cb(null, false));
              }
    });
  });
};