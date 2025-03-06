const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser');

require('dotenv').config()

const authRoutes = require('../routes/auth')
const carRoutes = require('../routes/cars')
const bookingRoutes = require('../routes/bookings')
const payRoutes = require('../routes/payment')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.get("/", (req, res) => {
    console.log(process.env.CLOUDINARY_NAME);
    res.send("Express on Vercel")
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.json({message:"goog"})
});


app.use("/auth",authRoutes)
app.use("/cars",carRoutes)
app.use("/bookings",bookingRoutes)
app.use("/pay",payRoutes)



app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;