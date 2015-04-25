/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName: 'string',
    lastName: 'string',
    isAnon: {
      type: 'boolean',
      defaultsTo: false
    },
    isSocialAlias: {
      type: 'boolean',
      defaultsTo: false
    },
    email: {
      type: 'email',
      unique: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    password: 'string',
    phoneNumber: 'integer',
    token: 'string',
    socialAccounts: {

    },
    friends: {
      collection: 'friend',
      via: 'owner'
    },
    identities: {
      collection: 'identity',
      via: 'owner'
    },
    conversations: {
      collection: 'conversation',
      via: 'users'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.token;
      delete obj.password;
      return obj;
    }
  }
};

