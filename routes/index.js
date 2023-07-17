const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { signinValidation, signupValidation } = require('../middlewares/validaition');

const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);
router.get('/signout', logout);
router.use(auth);
router.use('/users/me', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
