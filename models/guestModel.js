const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const guestSchema = new mongoose.Schema({
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
    room_id : {
        type: String,
        required : true
    },
    room_name : {
        type: String,
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
    transactionHistory : {
        type : Array
    },
    isPresent : {
        type: Boolean,
        default : true
    },
    dateCreated : {
        type: Date,
        default : Timestamp
    }
})

module.exports = mongoose.model('Guest', guestSchema)