'use strict';

var path = require('path');

module.exports = function(Usuario) {
  //send verification email after registration
  Usuario.afterRemote('create', function(context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: user
    };

    user.verify(options, function(err, response) {
      if (err) {
        Usuario.destroyById(user.id);
        return next(err);
      }
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
  
};
