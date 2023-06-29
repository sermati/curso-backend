import { Router } from 'express'
import ProductManager from '../ProductManager.js'

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

export default router