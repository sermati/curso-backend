import MessagesModel from '../models/messages.model.js'

export default class MessagesManager {

    constructor() {
        this.messagesModel = MessagesModel
    }

    async getMessages() {
        try {
            const messages = await this.messagesModel.find()
            return messages
        } catch (error) {
            console.log('Error al recuperar los mensajes: '+error)
        }
    }

    async addMessage(user, message) {
        try {
            const newMessage = await this.messagesModel.create({ user, message })
            return newMessage
        } catch (error) {
            console.log('Error al agregar el mensaje: '+error)
        }
    }

}