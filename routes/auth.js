import models from '../models'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

const router  = express.Router();

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
                let token = jwt.sign({ user: { id: user.id } }, config.secret, {
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

export default router