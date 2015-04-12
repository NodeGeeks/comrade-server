/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    encryptionLevel: {
      type: 'string',
      enum: ['none', 'mild', '']
    },
    content: 'string',
    conversation: {
      model: 'conversation'
    }
  }
};

