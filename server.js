const express = require("express");
const app = express();

const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const authRoute = require("./routes/auth");


const userRoute = require("./routes/user");

const jobRoute = require("./routes/job");

const bookRoute = require("./routes/bookmark");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/message");

dotenv.config();

mongoose.connect(`mongodb+srv:${process.env.MONGO_URL}`).then(()=> console.log("db connected")).catch((err)=> console.log(err));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});


app.use("/api/", authRoute);
app.use("/api/users", userRoute);

app.use("/api/jobs", jobRoute);


app.use("/api/bookmarks", bookRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);




const server = app.listen(process.env.PORT || 4000, ()=>{
  
  console.log(`LIstening on port ${[process.env.PORT]}!`);
});


const io = require('socket.io')(server,{
  pingTimeout : 6000,
  cors:{
    origin:"https://justie.onrender.com/"
  }
});

io.on("connection", (socket)=>{
  console.log("connected to sockets");

  socket.on('setup',(userId)=>{
    socket.join(userId);
    socket.broadcast.emit("online-user",userId)
    console.log(userId);
  });


  socket.on('typing', (room) =>{
    console.log("typing");
    console.log("room");
    socket.to(room).emit('typing',room)

  });

  socket.on('stop typing', (room) =>{
    console.log("typing");
    console.log("room");
    socket.to(room).emit('stop typing',room)

  });


  socket.on('join chat', (room)=>{
    socket.join(room)
    console.log('User Joined : ' + room);

  });

  socket.on('new message', (newMessageReceived)=>{
    var  chat = newMessageReceived.chat;

    var room = chat._id;

    var sender = newMessageReceived.sender;


    if(!sender || sender._id){
console.log("Sender not defined");

      return ;
    }

    
    var senderId = sender._id;

    console.log(senderId + "message sender");
    const users = chat.users;
    
    if(!users){
      console.log("Users not defined ");
      return;
    }



    socket.to(room).emit("message receive",newMessageReceived);
    
    socket.to(room).emit("message sent","New Message");

  });

  
socket.off('setup',()=>{
  console.log('user offline');
  socket.leave(userId);
})


})