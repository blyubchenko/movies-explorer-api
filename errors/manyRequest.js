const { HTTP_TOO_MANY_REQUESTS } = require('./statusErrors');

class ManyRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_TOO_MANY_REQUESTS;
  }
}

module.exports = ManyRequestError;
