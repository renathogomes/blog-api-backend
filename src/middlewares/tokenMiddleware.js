const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenValidate = (req, res, next) => {
  const authToken = req.header('Authorization');
  try {
    if (!authToken) {
      return res.status(401).json({ message: 'Token not found' });
    }
    
    const token = authToken.split(' ')[1];
    const payload = jwt.verify(token, secret);

    req.user = payload;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    } 
    console.log(error);
    return res.status(500).json({ message: 'Internal Error' });
  }

  next();
};

module.exports = tokenValidate;