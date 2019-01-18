import jwt from 'jsonwebtoken'
import unless from 'express-unless'
import models  from './models'

const AuthMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
  
    try {
      const data = await jwt.verify(token, 'supersecret');
      const id = data.user.id;
    
      models.User.findById(id).then(user => {
        req.user = user;
        next();
      })
  
      
    } catch(e) {
      res.status(401).send({
        message: 'Auth failed. Please provide a valid token.'
      });
    }
}

AuthMiddleware.unless = unless;

export default AuthMiddleware;