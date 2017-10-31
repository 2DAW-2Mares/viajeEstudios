'use strict';

module.exports = function(app) {
    //data sources
    var mysqlDs = app.dataSources.mysqlDs;
    if(process.env.AUTOMIGRATE) {
        mysqlDs.automigrate(null, function (err) {
            if (err) console.log(err);
            console.log('> Models migrated to tables');
            
            app.loadFixtures()
            .then(function() {
              console.log('Done!');
            })
            .catch(function(err) {
              console.log('Errors:', err);
            });
        });
    }
}