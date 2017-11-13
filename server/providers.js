var config = require('./config.local.js')

module.exports = {
  google_login: {
    provider: "google",
    module: "passport-google-oauth",
    strategy: "OAuth2Strategy",
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: "/auth/google/callback",
    authPath: "/auth/google",
    callbackPath: "/auth/google/callback",
    successRedirect: "/auth/account",
    failureRedirect: "/login",
    scope: ["email", "profile"],
    failureFlash: true
  }
};
