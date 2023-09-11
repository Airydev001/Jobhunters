const express = require("express");
const app = express();

const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const authRoute = require("../backend/routes/auth");


const userRoute = require("../backend/routes/user");

const jobRoute = require("../backend/routes/job");

const bookRoute = require("../backend/routes/job");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("db connected")).catch((err)=> console.log(err));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use("/api/", authRoute);
app.use("/api/users", userRoute);

app.use("/api/jobs", jobRoute);


app.use("/api/bookmarks", bookRoute);



app.listen(process.env.PORT || 4000, console.log(`LIstening on port ${[process.env.PORT]}!`));