const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: {type: String, trim: true},
        chat: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "Chat"
        }
    },
    {
        timestamps : true
    }
)

exports.Message = mongoose.model('Message', messageSchema)