/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  var id = req.headers.id;
  var token = req.headers.token;
  User.findOne({id: id }).exec( function found(err, user) {

    if (err) {
      return res.serverError(err);
    }

    if (!user) {
      return res.forbidden('bad access token');
    }

    if (user.token == token) {
      return next();
    } else {
      return res.forbidden('bad access token');
    }

  });
};
