module.exports = {

  responseObjects: {
    userNotFound: {message: 'No user was found with that login information', code: 'USER_NOT_FOUND'},
    invalidPassword: {message: 'Invalid password', code: 'INVALID_PASSWORD'},
    notFriends: {message: 'You are not friends with this person', code: 'NOT_FRIENDS'},
    invalidToken: {message: 'The token you are attempting to use is invalid', code: 'INVALID_TOKEN'}
  }
};
