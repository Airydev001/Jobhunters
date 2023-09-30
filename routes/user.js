const userController = require("../controllers/userController");
const { verifyAndAuthorization,verifyToken, verifyAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();


router.put("/", userController.updateUser);

router.delete("/", userController.deleteUser);

router.get("/", userController.getUser);


router.get("/", userController.getAllUsers);

module.exports= router;
