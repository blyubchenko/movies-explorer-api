const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequest');
const { HTTP_OK } = require('../errors/statusErrors');
const config = require('../config');
const messages = require('../errors/constantsMessages');

const { env, jwtSecret } = config;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const patchUsers = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(HTTP_OK).send({ user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(messages.messageEmailAlreadyRegistered));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(messages.messageEmailAlreadyRegistered));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(messages.messageInvalidData));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequestError(messages.messageInvalidEmailOrPassword);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequestError(messages.messageInvalidEmailOrPassword);
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        env === 'production' ? jwtSecret : 'dev-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      return res.status(HTTP_OK).send({ message: `Вход${messages.messageSuccessful}` });
    })
    .catch((err) => {
      next(err);
    });
};

function logout(req, res) {
  res.cookie('jwt', '', { expires: new Date(0) });
  return res.status(HTTP_OK).send({ message: `Выход${messages.messageSuccessful}` });
}

module.exports = {
  getUsers,
  patchUsers,
  createUser,
  login,
  logout,
};
