const router = require("express").Router()
const Details = require("../models/adminModel")
const Room = require("../models/roomModel")
const Guest = require("../models/guestModel")
const Booking = require("../models/bookingsModel")

// get users details 
router.get('/dashboard/:id', async(req, res)=> {
    try {
            const adminDetails = await Details.findById(req.params.id)
            const rooms = await Room.find()
            const guest = await Guest.find()
            const booking = await Booking.find()
            const busyRooms = rooms.filter((item)=>{
                if(item.isBusy === true) {
                    return item
                }
            })

            const recentBook = booking.filter((item)=>{
                if(item.isAccepted === false || item.isClosed === true) {
                    return item
                }
            })

            const activeGuest = await guest.filter((item)=> {
                if(item.isPresent === true) {
                    return item
                }
            })

            const nonActive = await guest.filter((item)=> {
                if(item.isPresent === false ) {
                    return item
                }
            })

            res.status(200).json({
                "total room count" : rooms.length,
                "Busy room total count" : busyRooms.length,
                "guest total count" : guest.length,
                "payload" : adminDetails,
                "total booking count" : booking.length,
                "recentBookings" : recentBook,
                "rooms" : rooms,
                "guest" : activeGuest,
                "nonActiveGuest" : nonActive
            })
    }catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router