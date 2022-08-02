const nodemailer = require("nodemailer")

async function sendMail(user, callback) {
    // create a resuable transporter object using the default smtp transport

    let testAccount =  nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port : 587,
        auth: {
        user: proccess.env.USER,
        pass: proccess.env.PASS
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
            <p> Your bokking code is ${user.booking_code} </p>
            <br> <br> <br> 
            <p> Enjoy your day! </p>
        `
    }

    // send mail with defined transporter
    let info = await transporter.sendMail(mailOption);

    callback(info)
}

module.exports = sendMail