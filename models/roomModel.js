const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
    roomName: {
        type:String,
        required : true
    },
    roomDescription : {
        type: String,
        required : true,
    },
    roomPrice : {
        type: String,
        required : true,
    },
    roomAccessCode : {
        type: String,
        required : true,
    },
    roomContact : {
        type: String,
        required : true,
    },
    cloudinary_Id : {
        type : String,
    },
    cloudinary_url : {
        type:String,
    },
    isBusy : {
        type: Boolean,
        default : false
    }
})

module.exports = mongoose.model('Room', RoomSchema)