/**
* Identity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    identity: 'string',
    singleUse: {
      type: 'boolean',
      defaultsTo: false
    },
    owner: {
      model: 'user'
    },
    socialPlatform: 'string',
    aliasOwner: {
      model: 'user'
    }
  }
};

