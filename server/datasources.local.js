// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var config = require('./config.local.js')

module.exports = {
  mysqlDs: {
    connector: 'mysql',
    hostname: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: 'viaje_estudios',
  },
  myEmailDataSource: {
    name: "myEmailDataSource",
    connector: "mail",
    transports: [{
      type: "SMTP",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.email_user,
        pass: config.email_password
      }
    }]
  }
};
