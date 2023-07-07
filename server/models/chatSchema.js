const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
    {
        chatName: { type: String, trime: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        latestMessage: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

exports.Chat = mongoose.model('Chat', chatSchema)