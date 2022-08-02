const router = require("express").Router()
const guest = require("../models/guestModel")

router.post("/", async(req, res) => {
    try {
        const allPresentGuest = await guest.find()
        const active = allPresentGuest.filter((items)=> {
            if(items.isPresent === true) {
                return items
            }
        })

        const allpresent = active.filter((element)=> {
            if(element.clock_in_date === req.body.check_in_date) {
                return element
            }
        })
        let hasErrors
        let message = ""
        if( allpresent.length === 0 ) {
            hasErrors = false
            message = "Date is free"
        }else {
            hasErrors = true
            message = "Date is not free"
        }
    res.json({
        hasErrors : hasErrors,
        message : message
    })
    }
    catch(err) {
        res.json({
            hasErrors : true,
            message : err
        })
    }
})
module.exports = router