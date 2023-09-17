const userController = require("../controllers/userController");
const { verifyAndAuthorization,verifyToken, verifyAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();


router.put("/",verifyAndAuthorization, userController.updateUser);

router.delete("/",verifyAndAuthorization, userController.deleteUser);

router.get("/",verifyAndAuthorization, userController.getUser);


router.get("/",verifyAndAdmin, userController.getAllUsers);

module.exports= router;