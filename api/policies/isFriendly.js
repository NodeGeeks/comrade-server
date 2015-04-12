/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var _ = require('underscore');

module.exports = function(req, res, next) {

  var userID = req.param('id');
  var friendID = req.param('friend');
  User.findOne({id: userID }).exec( function found(err, user) {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.forbidden('no user found');
    }

    var hasFriend = _.contains(user.friends, friendID);
    if (hasFriend) {
      return next()
    } else {
      return res.forbidden('you two are not friends');
    }

  });
};
