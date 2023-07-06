import { Router } from 'express'
import { productsUpdate } from '../utils.js'
import ProductManager from '../dao/managers/ProductManager.js'

const router = Router()

const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query
        //const url = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;
        const products = await productManager.getProducts(limit, page, sort, query)
        res.send(products)
    } catch (error) {
        res.status(500).send('Error al obtener los productos: ' + error)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid || undefined
        const result = await productManager.getProductById(pid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al obtener los productos: ' + error)
    }
})

router.post('/', async (req, res) => {
    try {
        const product = req.body
        const result = await productManager.addProduct(product)
        productsUpdate(req.app.get('io'))
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al ingresar el producto: ' + error)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid || undefined
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
        const pid = req.params.pid || undefined
        const result = await productManager.deleteProduct(pid)
        productsUpdate(req.app.get('io'))
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al eliminar el producto')
    }
})

export default router