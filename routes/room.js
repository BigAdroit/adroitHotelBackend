const router = require("express").Router()
const Room = require("../models/roomModel")
const upload = require("../middlewear/upload")
const cloudinary = require("../middlewear/cloudinary")

router.post('/create_room', upload.single('roomImage'), async(req, res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const room = new Room({
        roomName : req.body.roomName,
        roomDescription : req.body.roomDescription,
        isBusy : req.body.isBusy,
        roomPrice : req.body.roomPrice,
        roomAccessCode : req.body.roomAccessCode,
        roomContact : req.body.roomContact,
        cloudinary_id : result.public_id,
        cloudinary_url : result.secure_url
            })

        const save = await room.save()
        res.json({
            hasErrors : false,
            payload: save
        })
    }catch(err){
        res.send(err)
    }
})
router.get('/', (req, res)=> {
    res.json({
        "message":"romm cneected"
    })
})

router.get('/getAllRooms', async(req, res)=>{
   try {
    const rooms = await Room.find()
    const busyRooms = rooms.filter((item)=>{
        if(item.isBusy === true) {
            return item
        }
    })
    const availableRooms = rooms.filter((item)=> {
        if(item.isBusy === false) {
            return item
        }
    })
    res.status(200).json({
        "total count" : rooms.length,
        "busyrooms count" : busyRooms.length,
        "rooms": rooms,
        "busyRooms": busyRooms,
        "availableRooms" : availableRooms
    })
   }catch(err) {
        res.status(500).json({
            "error" : "Unknown Error found"
        })
   }
})

router.get('/getAroom/:id', async(req, res)=> {
    try {

        const room = await Room.findById(req.params.id)
        res.json({
            room
        })
    }catch(err){
        res.status(500).json({
            "error" : "Unknown Error found"
        })
    }
})

router.put('/updateRoom/:id', async(req, res)=> {
    try {
        const room = await Room.updateOne({_id:req.params.id}, {$set:{isBusy : req.body.isBusy}})
    res.json(room)
    }catch(err) {
        res.json(err)
    }
})

router.delete('/delete/:id', async (req, res)=> {
    const room = await Room.findByIdAndDelete(req.params.id)
    res.json({
        hasError : false,
        message : "Deleted successfully "
    })
})
module.exports = router