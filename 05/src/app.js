import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname, productsUpdate, chat } from './utils.js'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import messagesRouter from './routes/messages.router.js'
import { MONGO_STRING_CONNECTION, PORT, DB_NAME } from './configData.js'
import mongoose from 'mongoose'

// Express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Server
const serverHttp = app.listen(PORT, () => console.log('Servidor iniciado en puerto: ' + PORT))

// Socket
const io = new Server(serverHttp)
app.set('io', io)
io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado', socket.id)
    productsUpdate(io)
    chat(socket, io)
})

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/', viewsRouter)

// Mongoose
mongoose.connect(MONGO_STRING_CONNECTION).then((conn) => {
    console.log('Conectado a MongoDB: ' + DB_NAME)
}).catch((error) => {
    console.log('No se puede conectar con la base de datos: ' + error)
})