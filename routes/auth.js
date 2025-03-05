const express = require('express')
const { userLogin } = require ('../controllers/auth')

const router = express.Router()

router.get('/login',userLogin)
router.post('/sign-up',userLogin)
router.post('/log-out',userLogin)

module.exports = router

