const express = require('express')
const cors = require("cors")
require('dotenv').config()
const authRoutes = require('../routes/auth')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.get("/", (req, res) => {
    console.log(process.env.CLOUDINARY_NAME);
    res.send("Express on Vercel")
});
app.use("/auth",authRoutes)
// Routes
// auth
// users
// cars
// bookings
// payments


app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;