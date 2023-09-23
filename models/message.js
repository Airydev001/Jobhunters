const mongoose = require ("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    content: {
        type:String,
        trim:true,
    },
    receiver: {
        type: String, trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    readBy: [ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
]
});



module.exports = mongoose.model(
    "Message", messageSchema
);