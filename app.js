const express = require("express");
const app = express();

const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const authRoute = require("./src/routes/auth");


const userRoute = require("./src/routes/user");

const jobRoute = require("./src/routes/job");

const bookRoute = require("./src/routes/bookmark");

dotenv.config();

mongoose.connect(`mongodb+srv:${process.env.MONGO_URL}`).then(()=> console.log("db connected")).catch((err)=> console.log(err));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use("/api/", authRoute);
app.use("/api/users", userRoute);

app.use("/api/jobs", jobRoute);


app.use("/api/bookmarks", bookRoute);



app.listen(process.env.PORT || 4000, ()=>{
  
  console.log(`LIstening on port ${[process.env.PORT]}!`);
});