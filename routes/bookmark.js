const router = require("express").Router();
const { verifyAndAuthorization,verifyToken } = require("../middlewares/verifyToken");
const bookmarkController = require("../controllers/bookmarkController");


router.post("/",verifyAndAuthorization, bookmarkController.createBookmark);


router.delete("/:id", verifyAndAuthorization,bookmarkController.deleteBookmark);


router.get("/", verifyAndAuthorization,  bookmarkController.getBookmarks);

module.exports = router;