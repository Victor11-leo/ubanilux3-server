const {db} = require("../db/index")
const {Bookings} = require("../db/schema/bookings")

const fetchBooking = async (req,res) => {
    try {
        const bookings = await db.select().from(Bookings)
        console.log(bookings);
        res.json({message:"success", data:bookings})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const createBooking = async (req,res) => {
    try {
        const {paymentId,phone,carId,userId,pickupDate} = req.body

        const bookingCreated = await db.insert(Bookings)
        .values({
            pickupDate,
            paymentId,
            phone,
            userId,
            carId,
        }).returning()
        res.json({message:"success", data:bookingCreated})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const editBooking = async (req,res) => {
    try {
        const {status} = req.body
        const {id} = req.params
        
        await db.update(Bookings)
        .set({
            status
        })
        .where(eq(Bookings.id,id))
        res.json({message:"success"})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const deleteBooking = async (req,res) => {
    try {
        const {id} = req.params
        
        await db.delete(Bookings)
        .where(eq(Bookings.id,id))

        res.json({message:"success"})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

module.exports = {
    fetchBooking,
    createBooking,
    editBooking,
    deleteBooking
}