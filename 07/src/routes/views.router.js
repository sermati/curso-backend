import { Router } from 'express'
import ProductManager from '../dao/managers/ProductManager.js'
import CartManager from '../dao/managers/CartManager.js'

const router = Router()

router.get('/', async (req, res) => {
    const productManager = new ProductManager()
    const products = await productManager.getProducts()
    res.render('home', { title: 'Todos los productos', products: products })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Todos los productos' })
})

router.get('/chat', (req, res) => {
    res.render('chat', { title: 'Chat' })
})

router.get('/products', async (req, res) => {
    const { limit, page, sort, query } = req.query
    const productManager = new ProductManager()
    const products = await productManager.getProducts(limit, page, sort, query)
    res.render('products', { title: 'Productos filtrados desde MongoDB', products })
})

router.get('/cart/:cid', async (req, res) => {
    const cid = req.params.cid || undefined
    const cartManager = new CartManager()
    const cart = await cartManager.getCart(cid)
    res.render('cart', { title: 'Productos del carrito ID: ' + cid, cart })
})

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registrarme' })
})

router.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' })
})

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'Perfil del Usuario', user: req.session.user })
})

export default router