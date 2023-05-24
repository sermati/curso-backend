import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const pManager = new ProductManager('./products.json')

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined
        const products = await pManager.getProducts(limit)
        res.send(products)
    } catch (error) {
        console.error('Error al obtener los productos:', error)
        res.status(500).send('Error al obtener los productos')
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const product = await pManager.getProductById(pid)
        res.send(product)
    } catch (error) {
        console.error('Error al obtener el producto:', error)
        res.status(500).send('Error al obtener los productos')
    }
})

app.listen(8080, ()=> {
    console.log('Servidor...')
})