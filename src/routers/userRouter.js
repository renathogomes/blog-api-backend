const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, tokenMiddleware } = require('../middlewares');

router.post(
  '/',
  userMiddleware.displayNameValidation,
  userMiddleware.emailValidation,
  userMiddleware.passwordValidation,
  userMiddleware.userValidation,
  userController.userNewUserToken,
);
router.get('/', tokenMiddleware, userController.getAllUsers);

module.exports = router;