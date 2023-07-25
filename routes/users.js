const router = require('express').Router();
const { getUsers, patchUsers } = require('../controllers/users');
const { patchUsersValidation } = require('../middlewares/validaition');

router.get('', getUsers);
router.patch('', patchUsersValidation, patchUsers);

module.exports = router;
