const userController = require("../controllers/userController");
const { verifyAndAuthorization,verifyToken, verifyAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();


router.put("/:id",verifyAndAuthorization, userController.updateUser);

router.delete("/:id",verifyAndAuthorization, userController.deleteUser);

router.get("/:id",verifyAndAuthorization, userController.getUser);


router.get("/",verifyAndAdmin, userController.getAllUsers);

module.exports= router;