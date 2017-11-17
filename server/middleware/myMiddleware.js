module.exports = function() {
  return function myMiddleware(req, res, next) {
   console.info(req);
   next();
  }
};
