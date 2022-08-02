const router = require("express").Router()
const nodemailer = require("nodemailer")
const SendmailTransport = require("nodemailer/lib/sendmail-transport")
Bookings = require("../models/bookingsModel")

router.post('/create_bookings', async(req, res)=> {
    const bookings = await new Bookings({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        room_id : req.body.room_id,
        room_name : req.body.room_name,
        booking_code : req.body.booking_code,
        clock_in_date : req.body.clock_in_date,
        clock_out_date : req.body.clock_out_date,
        clock_in_time : req.body.clock_in_time,
        clock_out_time : req.body.clock_out_time
    })

    try{
        const save = await bookings.save()
        let user = req.body
        sendMail(user, info=> {
            console.log(`Message has been sent successfilly  and the id is ${info.messageId} `)
            res.json({
                payload : info,
                hasErrors : false
            })
        })
    }catch(err){
        res.json(err)
    }
})

// mailing 
async function sendMail(user, callback) {
    // create a resuable transporter object using the default smtp transport

    let testAccount =  nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port : 587,
        auth: {
        user: "eosemegbe@gmail.com",
        pass: "tgnlcemksrltdena"
  }
    })

    let mailOption = {
        from : '"Adroit Hotel"', // semder address
        to: user.email,
        subject : "Booking was successfuly",
        html : `<h1> ${user.firstname} ${user.lastname} </h1> <br>
            <h4>  Welcome to Adroit Hotel</h4>
            <p> Room Booked : ${user.room_name} </p>
            <p> Clock in Date : ${user.clock_in_date} </p>
            <p> Clock out Date : ${user.clock_out_date} </p>
            <p> Your booking code is ${user.booking_code} </p>
            <br> <br> <br> 
            <p> Enjoy your day! </p>
        `
    }

    // send mail with defined transporter
    let info = await transporter.sendMail(mailOption);

    callback(info)
}

router.get('/getAllBookings', async(req, res)=> {
    try {
        const allBookings = await Bookings.find()
        const bookings = allBookings.filter((item)=>{
            if(item.isAccepted === false ) {
                return item
            }
        })
        res.json({
            total_count : allBookings.length,
            bookings : bookings,
            hasError : false
            
        })
    }catch(err) {
        res.json({
            hasError : true,
            error : err
        })
    }

})
router.get('/:id', async(req, res)=> {
    try {
            const booking = await Bookings.findById(req.params.id)
            res.status(200).json({
                hasError : false,
                booking : booking
            })
    }catch(err) {
        res.json({
            hasError : true
        })
    }
})

router.put('/accept/:id', async (req, res)=>{
    try {
            const updateRecord = await Bookings.updateOne({_id:req.params.id}, {$set:{isAccepted : req.body.isAccepted}})
            res.status(200).json({
                hasError : false,
                message : "Successfuly Updated!"
            })
    }catch(err) {
        res.json({
            hasError : true,
            message : "An error occur while proccessing your response"
        })
    }
})

module.exports = router