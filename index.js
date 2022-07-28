const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
require("dotenv").config()


const uri = process.env.MONGODB_CONNECTION_STRING;

const roomRoute = require("./routes/room")
const guestRoute = require("./routes/guests")
const authRoute = require("./routes/auth")
const dashboard = require('./routes/dashboard')
const bookings = require('./routes/bookings')

const url ='mongodb://localhost/hotel'
mongoose.Promise = global.Promise

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> {
        console.log("database connected")
    })

// Using middlewares in the apllication 
app.use(cors())
app.use(express.json())
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.use('/room', roomRoute)
app.use('/guest', guestRoute)
app.use('/auth', authRoute)
app.use('/admin', dashboard)
app.use('/bookings', bookings)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res)=>{
    res.json({
        "connection": "Successful"
    })
})

app.get("/data", (req, res)=> {
    res.json({
        connection: "connection Successful",
        payload : "Everything working perfectly"
    })
})
app.listen(9000, ()=> {
    console.log("connected to localhost : 9000 successfully")
})