const loginRoute = require('./loginRouter');
const userRoute = require('./userRouter');
const categoryRoute = require('./categoryRouter');
const postRoute = require('./postRouter');

module.exports = {
  loginRoute,
  userRoute,
  categoryRoute,
  postRoute,
};

// console.log(typeof loginRoute);
// console.log(typeof userRoute);
// console.log(typeof categoryRoute);