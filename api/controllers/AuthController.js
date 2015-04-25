/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var chance = require('chance'),
    crypto = require('crypto'),
    emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

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
      //passwords can be null if the user is anon, however they are warned when creating their anon user
      User.findOne({deviceId: req.body.deviceId, password: req.body.password}).exec(function(err, anon){

        if (err) {
          return res.json({error: err});
        }

        if (_.isEmpty(anon)) {
          User.create({ username: username, deviceId: req.body.deviceId, password: req.body.password, isAnon: true}).exec(function(err, newAnon) {
            if (err) {
              return res.json({error: err});
            }

            if (newAnon) {
              return res.jsonp(newAnon);
            }
          });
        } else {
          return res.jsonp(anon);
        }

      });
    } else {
      var findObject;

      //checking if the login they are using is a email or username
      //todo: support phone number login
      if (emailRegex.test(req.body.login)) {
        findObject = {email: req.body.login}
      } else {
        findObject = {username: req.body.login}
      }

      User.findOne(findObject).exec(function(err, user) {

        if (err) {
          return res.json({error: err});
        }

        if (_.isEmpty(user)) {
          return res.json(ErrorService.responseObjects.userNotFound)
        } else {
          return res.jsonp(user);
        }

      })
    }
  },

  logout: function (req, res) {
    User.update({id: req.headers.id}, {token: null}).exec(function afterwards(err,updated){

      if (err) {
        return res.json({error: err});
      }

      if(updated) {
        return res.json({message: 'Logged out successfully'})
      }

    });

  }


};

