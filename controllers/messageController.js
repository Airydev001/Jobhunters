const Message = require("../models/message");
const Chat = require("../models/chat");
const User = require("../models/user")

 module.exports = {
    getAllMessage: async (req,res) => {
        try{
        const pageSize = 12;
        const page = req.query.page || 1

//Calculate the number of messages to skip

        const skipMessages = (page -1) * pageSize;

        //Find messages with paginattion
        var messages = await Message.find({
            chat: req.params.id
        })
        .populate("sender", "username profile email" )
        .populate('chat')
        .sort({
            createdAt: -1
        })//sort message by descending order
       .skip(skipMessages) //skip messages based on pagination
       .limit(pageSize)//limit the number of messages 

       messages = await User.populate(messages,{
        path: "chat.users",
        select: "username profile email"
       });

       res.json(messages);
        } catch(error){
        res.status(500).json({
            error: "could not retrieve messages"
        })
        }
    },
    sendMessage: async(req,res) =>{
        const {content,chatId,receiver}  = req.body
        if(!content || !chatId){
            console.log("Invalid data")
            return res.status(400).json("Invalid data");

        }

        var newMessage = {
               sender: req.user.id,
               content: content,
               receiver:receiver,
               chat: chatId,
        }
        try{
           var message = await Message.create(newMessage);

           message =await message.populate("sender", "username profile email" )
           message =await message.populate("chat" )
           message =await User.populate(message,{
            path: "chat.users",
            select: "username profile email",
           });

           await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message });

           res.json(message);

        } catch(error){
res.status(400).json({
    error: error
});
        }
    }
}