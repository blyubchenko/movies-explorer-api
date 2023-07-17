const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');
const config = require('../config');

const { env, jwtSecret } = config;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, env === 'production' ? jwtSecret : 'dev-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
