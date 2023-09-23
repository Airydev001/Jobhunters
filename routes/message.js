const router = require("express").Router();
const messageController = require("../controllers/messageController")
const { verifyAndAuthorization,verifyToken } = require("../middlewares/verifyToken");


//Create Messages
router.post("/",verifyAndAuthorization, messageController.sendMessage);




//Get all messages
router.get("/:id", verifyAndAuthorization, messageController.getAllMessage);

module.exports = router;