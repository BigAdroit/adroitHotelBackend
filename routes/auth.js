router = require("express").Router()
const Admin = require("../models/adminModel")


router.post('/login', async(req, res)=> {
    try {
        const admin = await Admin.findOne({email : req.body.email, password : req.body.password})
        let permissions = []
        if(!admin) {
            res.staus(404).json({
                "error" : "Username and Password not found ",
                "isSuccessful" : false
            })
        } else {
            if(admin?.role === "super-admin"){
            permissions = ["Room", "Guest", "Employee", "Settings", "Dining & Bar", "Dashboard", "Bookings", "Settings"]
            }else if (admin.role === "receptionist") {
            permissions = ["Room", "Guest", "Bookings"]
             }
            res.status(200).json({
            "permission" : permissions,
            "details" : admin,
            "isSuccessful" : true
        })
        }


    }catch(err) {
        res.status(500).json({
            "errors": "An Error occur ",
            "isSuccessful" : false
        })
    }
})

router.post('/register', async(req, res)=> {
    const newAdmin = await new Admin({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        username: req.body.username,
        password : req.body.password,
        role : req.body.role
    })

    const save = await newAdmin.save()
    res.json(save)
})

module.exports = router