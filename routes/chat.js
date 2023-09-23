const router = require("express").Router();
const { verifyAndAuthorization,verifyToken } = require("../middlewares/verifyToken");
const chatController = require("../controllers/chatController")

//Create chat
 router.post("/",verifyAndAuthorization, chatController.accessChat);




//Get chat
router.get("/:id", verifyAndAuthorization, chatController.getChat);

module.exports = router;