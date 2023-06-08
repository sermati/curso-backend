import { Router } from 'express'
import ProductManager from '../ProductManager.js'
import { __dirname, productsUpdate } from '../utils.js'

const productManager = new ProductManager(__dirname + '/json/products.json')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined
        const products = await productManager.getProducts(limit)
        res.send(products)
    } catch (error) {
        res.status(500).send('Error al obtener los productos')
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const product = await productManager.getProductById(pid)
        res.send(product)
    } catch (error) {
        res.status(500).send('Error al obtener los productos')
    }
})

router.post('/', async (req, res) => {
    try {
        const products = req.body
        const result = await productManager.addProduct(products)
        productsUpdate(req.app.get('io'))
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al ingresar el producto')
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const products = req.body
        const result = await productManager.updateProduct(pid, products)
        productsUpdate(req.app.get('io'))
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al editar el producto')
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid) || undefined
        const result = await productManager.deleteProduct(pid)
        productsUpdate(req.app.get('io'))
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al eliminar el producto')
    }
})

export default router