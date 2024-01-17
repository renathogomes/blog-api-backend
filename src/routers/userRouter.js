const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

// console.log(typeof userController);
// console.log(typeof userMiddleware);

router.post('/', userMiddleware, userController);

module.exports = router;