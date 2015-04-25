/**
* Friend.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    owner: {
      model: 'user'
    }
    /**
     * todo implement a limits property that is a many to one.
     * the limit model is used to build a dynamic condition to block or allow specific user interaction between them and
     * a friend. For example: User chooses a friend 'can not send location invite'.
     */

  }
};

