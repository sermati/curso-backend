import mongoose from 'mongoose'

export const messagesCollection = 'messages'

const messagesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const MessagesModel = mongoose.model(messagesCollection, messagesSchema)

export default MessagesModel