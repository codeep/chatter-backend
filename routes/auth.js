const models  = require('../models');
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    console.log('get');
    res.send('anything OK')
});

router.post('/sign-up', (req,res) => {
    let { firstName, lastName, email, password, gender, birthDate } = req.body;

    email = email.toLowerCase();
    password = bcrypt.hashSync(String(password), 8);
        
    models.User.findOne({ where: {email} }).then(user => {
        if (user) {
            return res.sendStatus(401);
        }

        models.User.create({ 
            firstName, 
            lastName, 
            email, 
            password, 
            gender, 
            birthDate 
        })
        .then(newUser => {
            return res.send(newUser).status(201);
        })
    })
})

router.post('/sign-in', (req,res) => {
    
    let { email, password } = req.body;
    
    email = email.toLowerCase();
        
    models.User.findOne({ where: {email} }).then(user => {

        if (user) {
            if(bcrypt.compareSync(password, user.password)) {
                // generate token and send
                let token = jwt.sign({ user: { id: user.id } }, 'supersecret', {
                    expiresIn: "7d" // expires in 24 hours
                });
                
                res.status(200).send({ auth: true, token: token });

            } else {
                // obj with text msg
                res.status(401).send({ auth: false, token: null })

            }
        } else {
            // obj with text msg
            res.status(401).send({ auth: false, token: null })
        }
        
   })
})

module.exports = router;