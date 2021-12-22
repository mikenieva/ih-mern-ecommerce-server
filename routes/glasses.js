// ./server/routes/glasses.js

const express 		= require("express")
const router	    = express.Router()

const glassesController = require("./../controllers/glassesController")

router.post("/create", glassesController.create)
router.get("/getall", glassesController.getAll)
router.get("/getone/:glassesID", glassesController.getOne)


module.exports = router