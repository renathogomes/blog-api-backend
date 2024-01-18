const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, validEmailMiddleware } = require('../middlewares');

router.post('/', validEmailMiddleware, userMiddleware, userController);

module.exports = router;