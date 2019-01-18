const express = require('express')
const router  = express.Router()


router.post('/', (req,res) => {
    
    const obj = {
        firstName : "firstName",
        lastName : "lastName"
    }
    
    res.send(obj)
   
})

module.exports = router