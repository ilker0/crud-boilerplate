const httpStatusCodes = require('./httpStatusCodes');

module.exports = error => {
  const { name } = error;

  if (name === 'QueryFailedError') {
    return {
      status: 400,
      message: error.detail,
    };
  }

  if (name === 'ValidationError') {
    return {
      status: 422,
      message: error.message,
    };
  }

  if (name === 'RequestError') {
    return {
      status: 400,
      message: error.message,
    };
  }

  return {
    status: 500,
    message: httpStatusCodes[500],
  };
};
