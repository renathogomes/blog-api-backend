const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, tokenMiddleware } = require('../middlewares');

router.post('/', userMiddleware, userController.userNewUserToken);
router.get('/', tokenMiddleware, userController.getAllUsers);

module.exports = router;