const router = require("express").Router()
const guest = require("../models/guestModel")
const Guest = require("../models/guestModel")
const Room = require("../models/roomModel")

router.get("/allGuest", async(req, res)=> {
    try{
        const guests = await Guest.find()
        const activeGuest = await guests.filter((data)=>{
            if(data.isPresent === true ) {
                return data
            }
        })

        res.json({
            "total guest count" : guests.length,
            "total count of Present guest" : activeGuest.length,
            "guest" : [guests],
            "active guest" : activeGuest,
        })
    }catch(err) {
        res.json(err)
    }
})

router.post("/create_guest", async(req, res)=> {
    let date = new Date()
    try{
        room = await Room.updateOne({_id:req.body.room_id}, {$set:{isBusy : true}})
        const guest = await new Guest({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body.phone,
            room_id : req.body.room_id,
            room_name : req.body.room_name,
            clock_in_date : req.body.clock_in_date,
            clock_out_date : req.body.clock_out_date,
            clock_in_time : req.body.clock_in_time,
            clock_out_time : req.body.clock_out_time,
            transactionHistory : req.body.transactionHistory
        })

        const save = await guest.save()
        res.status(200).json({
            "Message": "User created Successfully",
            "guest": save,
            hasError : false
        })
    }catch(err) {
        res.json(err)
    }
})

router.get('/:id', async(req, res)=> {
    try{
        const guest = await Guest.findById(req.params.id)
        res.status(200).json({
            "Message": "Guest Found",
            "Guest" : guest
        })
    }catch(err) {

    }
})

router.get('/guestRoom/:roomId/:guestId', async(req, res)=> {
    try {
        const room = await Room.findById(req.params.roomId)
        const guest = await Guest.findById(req.params.guestId)
        res.status(200).json({
            "roomDetails" : room,
            "guestDetails" : guest
        })
    }catch(err) {
        res.status(500).json(err)
    }
})

//checkout Guest 
router.put("/checkout/:id", async(req, res)=> {
    try{
        const checkout = await Guest.updateOne({_id : req.params.id}, {$set : {isPresent : req.body.isPresent}})
        const Roomcheckout = await Room.updateOne({_id : checkout.room_id}, {$set : {isBusy : false}})

        res.status(200).json({
            hasError : false,
            message : "Successfully updated",
        })
    }catch (err) {
        res.status(500).json({
            hasError : true,
            message : "Something went wrong!"
        })
    }   
})
module.exports = router