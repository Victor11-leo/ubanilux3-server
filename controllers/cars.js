const { eq } = require("drizzle-orm");
const {db} = require("../db/index")
const {Cars} = require("../db/schema/cars")
const cloudinary = require('cloudinary').v2;

require('dotenv').config()

const fetchCar = async (req,res) => {
    try {
        const cars = await db.select().from(Cars)
        console.log(cars);
        res.json({message:"success", data:cars})
    } catch (error) {
        console.log(error);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const fetchSpecificCar = async (req,res) => {
    try {
        const {id} = req.params
        const cars = await db.select().from(Cars).where(eq(Cars.id,id))
        res.json({message:"success", data:cars})
    } catch (error) {
        console.log(error);
        res.json({error:`Error is ${error.message}`})
        
    }
}


const createCar = async (req,res) => {
    try {
        const {rentalPrice,model,description,name} = req.body
        
        const bookingCreated = await db.insert(Cars)
        .values({
            rentalPrice,
            model,
            description,
            name
        }).returning()

        res.json({message:"success", data:bookingCreated})
    } catch (error) {
        console.log(error);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const editCar = async (req,res) => {
    try {
        const {image,rentalPrice,model,description,name} = req.body
        const {id} = req.params

        let uploadedImage

        const carsFound = await db.select({id}).from(Cars)
        const carFound = carsFound[0]
        
        if (image != null ){
            cloudinary.config({ 
                cloud_name: process.env.CLOUDINARY_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY, 
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
    
            uploadedImage = await cloudinary.uploder.upload(image,{
                folder:'ubanilux-cars',
                tags:['ubanilux-cars']
            })
        }

        await db.update(Cars)
        .set({
            image: uploadedImage != undefined ? uploadedImage : carFound.uploadedImage,
            rentalPrice :rentalPrice.length > 1 ? rentalPrice : carFound.rentalPrice,
            model: model.length > 1 ? model : carFound.model,
            description: description.length > 1 ? description : carFound.description,
            name: name.length > 1 ? name : carFound.name
        })
        .where(eq(Cars.id,id))
        res.json({message:"success"})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const deleteCar = async (req,res) => {
    try {
        const {id} = req.params
        
        await db.delete(Cars)
        .where(eq(Cars.id,id))

        res.json({message:"success"})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

module.exports = {
    fetchCar,
    fetchSpecificCar,
    createCar,
    editCar,
    deleteCar
}