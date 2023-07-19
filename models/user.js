const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../errors/constantsMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: messages.messageInvalidEmail,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
