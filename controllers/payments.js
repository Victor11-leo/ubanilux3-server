require('dotenv').config()
const axios = require("axios")

const generateToken = async (req,res,next) => {
    const secret = process.env.MPESA_SECRET
  const consumer = process.env.MPESA_CONSUMER
  console.log('generating token');
  const auth = new Buffer.from(`${consumer}:${secret}`).toString('base64')
  await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers:{
        authorization: `Basic ${auth}`
      }
    }
  ).then((response) => {
    const token = response.data.access_token
    req.token = token
    next()
  }).catch((err) => {
    console.log(err.message);
    res.status(400).json(err.message)
  })
}

const stkPush = async (req,res) => {
    try {
        const {phone,amount} = req.body
        console.log('stk Pushing');
        console.log(phone);
        const phoneNum = phone.substring(1)
        const date = new Date()
        const timeStamp = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + (date.getDate() + 1)).slice(-2) + ("0" + (date.getHours() + 1)).slice(-2) + ("0" + (date.getMinutes() + 1)).slice(-2) + ("0" + (date.getSeconds() + 1)).slice(-2)
        const token = req.token
        
        const shortCode = process.env.MPESA_SHORTCODE
        const passKey = process.env.MPESA_PASSKEY

        const password = new Buffer.from(shortCode + passKey + timeStamp).toString('base64')

        await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
              BusinessShortCode: shortCode,    
              Password: password,    
              Timestamp:timeStamp,    
              TransactionType: "CustomerPayBillOnline",    // "CustomerBuyGoodsOnline"
              Amount: amount,    
              PartyA:`254${phoneNum}`,    
              PartyB:shortCode,    
              PhoneNumber:`254${phoneNum}`,    
              CallBackURL: "https://1986-102-213-251-138.ngrok-free.app/pay",    
              AccountReference:`254${phoneNum}`,    
              TransactionDesc:"Ubanilux Booking"
            },
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          ).then((response) => {
            console.log(response.data);
            res.status(200).json({message:"success",data:response.data})
          })
          .catch((err) => {
            console.log(err.message);
            res.status(400).json(err.message)
          })

        
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}

const stkCallback = async (req,res) => {
    try {
        const callbackData = req.body
        console.log(callbackData);
        res.json({message:"success"})
    } catch (error) {
        console.log(error.message);
        res.json({error:`Error is ${error.message}`})
        
    }
}



module.exports = {
    stkPush,
    stkCallback,
    generateToken
}