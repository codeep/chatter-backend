const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const unless = require('express-unless');
const models  = require('./models');

const auth = require('./routes/auth');
const msg = require('./routes/msg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authMiddleware = async (req, res, next) => {
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

authMiddleware.unless = unless;

app.use(authMiddleware.unless({ path: /^\/auth./ }))

app.use('/auth', auth);
app.use('/msg', msg);

app.use(function(err, req, res, next) {
  res.send(err.error).status(err.status || 500);
});

module.exports = app;
