const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, tokenMiddleware } = require('../middlewares');

router.post(
  '/',
  userMiddleware.displayNameValidation,
  userMiddleware.emailValidation,
  userMiddleware.passwordValidation,
  userController.newUser,
);
router.get('/', tokenMiddleware, userController.getAllUsers);
router.get('/:id', tokenMiddleware, userController.getUserById);

module.exports = router;