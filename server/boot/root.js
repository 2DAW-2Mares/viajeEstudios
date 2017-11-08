'use strict';
var dsConfig = require('../datasources.local.js');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  //login page
  router.get('/', function(req, res) {
    var credentials = dsConfig.myEmailDataSource.transports[0].auth;
    res.render('login', {
      email: credentials.user,
      password: credentials.pass
    });
  });
  
  //verified
  router.get('/verified', function(req, res) {
    res.render('verified');
  });

  server.use(router);
};
