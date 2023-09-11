const Bookmark = require("../models/bookmark");
export async function createBookmark(req, res) {
  const newBook = new Bookmark(req.body);

  try {
    const savedBookmark = await newBook.save();

    res.status(201).json("Bookmark sucessfully created");
  } catch (error) {
    res.status(500).json(error);
  }
}
export async function deleteBookmark(req, res) {
  // const newBook = new Bookmark(req.body);
  try {
    await findByIdAndDelete(req.params.id);

    res.status(200).json("Bookmark sucessfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
}
export async function getBookmarks(req, res) {


  try {
    const bookmark = await find({
      userId: req.params.userId
    });

    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json(error);
  }
}