const express = require('express')
const { 
    fetchCar,
    fetchSpecificCar,
    createCar,
    editCar,
    deleteCar
 } = require ('../controllers/cars')

const router = express.Router()

router.get('/',fetchCar)
router.get('/:id',fetchSpecificCar)
router.post('/',createCar)
router.put('/:id',editCar)
router.delete('/:id',deleteCar)

module.exports = router

