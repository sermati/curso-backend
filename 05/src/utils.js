import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ProductManager from './dao/managers/ProductManager.js'
import MessagesManager from './dao/managers/MessagesManager.js'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export async function productsUpdate(io) {
    const productManager = new ProductManager()
    const products = await productManager.getProducts()
    io.emit('productsUpdate', products)
}

export async function chat(socket, io) {
    const messagesManager = new MessagesManager()
    socket.on('authenticated', async (data) => {
        const messages = await messagesManager.getMessages()
        // Se muestra solo al usuario de la conexion
        socket.emit('message', messages)
        // Se muestra a todos menos al usuario de la conexion
        socket.broadcast.emit('newUserConnected', data)
    })
    socket.on('message', async (data) => {
        const { user, message } = data
        await messagesManager.addMessage(user, message)
        const messages = await messagesManager.getMessages()
        // Se muestra a todos
        io.emit('message', messages)
    })
}