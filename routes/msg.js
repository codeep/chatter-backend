import express from 'express'
const router  = express.Router()


router.post('/', (req,res) => {
    
    const obj = {
        firstName : "firstName",
        lastName : "lastName"
    }
    
    res.send(obj)
   
})

export default router