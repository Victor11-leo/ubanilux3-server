const express = require('express')
const { 
    stkCallback,
    stkPush,
    generateToken
 } = require ('../controllers/payments')

const router = express.Router()

router.post('/',stkCallback)
router.post('/stk',generateToken,stkPush)


module.exports = router

