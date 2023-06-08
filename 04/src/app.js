import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname , productsUpdate } from './utils.js'
import { Server } from 'socket.io'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'

// Express
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Server
const port = 8080
const serverHttp = app.listen(port, () => console.log('Servidor iniciado en puerto: ' + port))

// Socket
const io = new Server(serverHttp)
app.set('io', io)
io.on('connection', socket => {
    console.log('Nuevo Cliente Conectado', socket.id)
    productsUpdate(io)
})

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)



