/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  addIdentity: function(req, res) {
    Identity.create({username: req.body.username, password: req.body.password}).exec(function(err, identity) {
      if(err) {
        return res.json({error: err});
      }
      if(identity) {
        User.findOne({id: req.headers.id}).populate('')
      }
    });
  }
};

