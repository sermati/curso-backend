import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    const productManager = new ProductManager('./src/json/products.json')
    const products = await productManager.getProducts()
    res.render('home', { title: 'Todos los productos', products: products })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Todos los productos' })
})

export default router