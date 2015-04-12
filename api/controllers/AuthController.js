/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var chance = require('chance'),
    crypto = require('crypto');

module.exports = {

  register: function(req, res) {
    User.create({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phoneNumber: req.body.phoneNumber, password: req.body.password}).exec(function(err, user) {
      if(err) {
        return res.json({error: err});
      }

      if(user) {
        return res.json(user);
      }
    });
  },

  login: function(req, res) {
    if(req.body.isAnon) {
      var username = (chance.last() + chance.last() + chance.d100()).toLowerCase();
      User.findOne({deviceId: req.body.deviceId}).exec(function(err, user){
        if (!user) {
          User.create({ username: username, deviceId: req.body.password}).exec(function(err, user) {

          });
        } else {
          return res.jsonp(user);
        }
      });
    } else {
      User.findOne({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phoneNumber: req.body.phoneNumber, password: req.body.password}).exec(function(err, user) {

      })
    }
  },

  logout: function (req, res) {

  }


};

