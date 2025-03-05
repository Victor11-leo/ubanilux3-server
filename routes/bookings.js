const express = require('express')
const { 
    fetchBooking,
    createBooking,
    editBooking,
    deleteBooking
 } = require ('../controllers/bookings')

const router = express.Router()

router.get('/',fetchBooking)
router.post('/',createBooking)
router.put('/:id',editBooking)
router.delete('/:id',deleteBooking)

module.exports = router

