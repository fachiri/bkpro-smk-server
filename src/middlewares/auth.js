const jwt = require('jsonwebtoken');
const { secret } = require('./../config/keys')

const authMiddleware = {
  verifyToken: (req, res, next) => {
    try {
      const bearerHeader = req.headers['authorization'];

      if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
        throw {code: 403, message: 'Token tidak tersedia.'}
      }
      
      const bearerToken = bearerHeader.split(' ')[1];

      jwt.verify(bearerToken,
        secret,
        (err, decoded) => {
          if (err) {
          console.log(err)
          throw {code: 401, message: 'Token tidak sah'}
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      });
    }
  },
  isAdmin: (req, res, next) => {
    try {
      if(req.user.role !== 'ADMIN') {
        throw {code: 401, message: 'Akses tidak sah'}
      }
      next();
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      });
    }
    
  }
}

module.exports = authMiddleware