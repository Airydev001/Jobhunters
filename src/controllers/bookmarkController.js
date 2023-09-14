const Bookmark = require("../models/bookmark");
const Job = require("../models/jobs");

 module.exports = {
  createBookmark: async (req, res)=> {
 const jobID = req.body.job;

  try {
    const  job = await Job.findById(jobID);
if(!job){
  return res.status(404).json({
    error: "Job not found"
  });
}
const newBook = new Bookmark({
  job: job, userId: req.user.id,
})
    const savedBookmark = await newBook.save();
const {__v,updatedAt, ...newBookmarkInfo} = savedBookmark._doc;
    res.status(200).json(newBookmarkInfo);
  } catch (error) {
    res.status(500).json(error);
  }
},
 deleteBookmark: async (req, res)=> {
  // const newBook = new Bookmark(req.body);
  try {
    await findByIdAndDelete(req.params.id);

    res.status(200).json("Bookmark sucessfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
},
getBookmarks: async (req, res) =>{


  try {
    const bookmark = await find({
      userId: req.params.userId
    });

    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json(error);
  }
},
}