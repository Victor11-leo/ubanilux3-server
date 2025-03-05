const express = require('express')
const { 
    fetchCar,
    createCar,
    editCar,
    deleteCar
 } = require ('../controllers/cars')

const router = express.Router()

router.get('/',fetchCar)
router.post('/',createCar)
router.put('/:id',editCar)
router.delete('/:id',deleteCar)

module.exports = router

