import express from 'express'
import ProductManager from './ProductManager.js'
import CartManager from './CartManager.js'

const app = express()
app.use(express.json())

const productManager = new ProductManager('./products.json')
const cartManager = new CartManager('./carts.json')

// PRODUCTS
app.get('/api/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined
        const products = await productManager.getProducts(limit)
        res.send(products)
    } catch (error) {
        res.status(500).send('Error al obtener los productos')
    }
})

app.get('/api/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const product = await productManager.getProductById(pid)
        res.send(product)
    } catch (error) {
        res.status(500).send('Error al obtener los productos')
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const products = req.body
        const result = await productManager.addProduct(products)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al ingresar el producto')
    }
})

app.put('/api/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const products = req.body
        const result = await productManager.updateProduct(pid, products)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al editar el producto')
    }
})

app.delete('/api/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const result = await productManager.deleteProduct(pid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al eliminar el producto')
    }
})

// CARTS
app.post('/api/carts', async (req, res) => {
    try {
        const products = req.body
        const result = await cartManager.createCart(products)
        res.status(result[0]).send(result[1])

    } catch (error) {
        res.status(500).send('Error al ingresar el carrito')
    }
})

app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid) || undefined
        const cart = await cartManager.getCartById(cid)
        res.send(cart)
    } catch (error) {
        res.status(500).send('Error al obtener el carrito')
    }
})

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid) || undefined
        const pid = parseInt(req.params.pid) || undefined
        const result = await cartManager.addToCart(cid, pid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al editar el carrito: '+error)
    }
})

// SERVER
app.listen(8080, ()=> {
    console.log('Servidor escuchando en puerto 8080')
})