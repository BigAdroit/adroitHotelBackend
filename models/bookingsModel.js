const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    room_name : {
        type : String,
        required : true
    },
    room_id : {
        type: String,
        required : true
    },
    booking_code : {
        type : String,
        required : true 
    },
    clock_in_date : {
        type : String,
        required : true 
    },
    clock_out_date : {
        type : String,
        required : true
    },
    clock_in_time : {
        type : String,
        required : true
    },
    clock_out_time : {
        type : String,
        required : true 
    },
    isAccepted : {
        type: Boolean,
        default : false
    },
    isClose : {
        type : String,
        required : false
    },
    dateCreated : {
        type: Date,
        default : Timestamp
    }
})

module.exports = mongoose.model('Bookings', bookingSchema)