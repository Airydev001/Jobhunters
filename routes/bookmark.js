const router = require("express").Router();
const { verifyAndAuthorization,verifyToken } = require("../middlewares/verifyToken");
const bookmarkController = require("../controllers/bookmarkController");


router.post("/",verifyAndAuthorization, bookmarkController.createBookmark);


router.delete("/:id", verifyToken,bookmarkController.deleteBookmark);


router.get("/:userId", bookmarkController.getBookmarks);

module.exports = router;