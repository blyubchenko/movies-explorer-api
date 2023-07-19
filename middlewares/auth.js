const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');
const config = require('../config');
const messages = require('../errors/constantsMessages');

const { env, jwtSecret } = config;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(messages.messageAuthRequired));
  }
  let payload;
  try {
    payload = jwt.verify(token, env === 'production' ? jwtSecret : 'dev-secret-key');
  } catch (err) {
    return next(new UnauthorizedError(messages.messageAuthRequired));
  }
  req.user = payload;

  return next();
};
