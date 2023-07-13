import { Router } from 'express'
import CartManager from '../dao/managers/CartManager.js'

const router = Router()

const cartManager = new CartManager('./json/carts.json')

router.post('/', async (req, res) => {
    try {
        const products = req.body
        const result = await cartManager.createCart(products)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al crear el carrito' + error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid || undefined
        const cart = await cartManager.getCart(cid)
        res.send(cart)
    } catch (error) {
        res.status(500).send('Error al obtener el carrito' + error)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid || undefined
        const pid = req.params.pid || undefined
        const result = await cartManager.addToCart(cid, pid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al agregar al carrito: ' + error)
    }
})

router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid || undefined
        const pid = req.params.pid || undefined
        const result = cartManager.deleteFromCart(cid, pid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send("Error: " + error.message)
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid || undefined
        const result = await cartManager.emptyCart(cid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send("Error: " + error.message)
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid || undefined
        const updatedProducts = req.body.products
        result = await cartManager.updateProductsFromCart(cid, updatedProducts)
        res.status(result[0]).send(result[1])
    } catch {
        res.status(500).send("Error: " + error.message)
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const updatedProduct = req.body
        const cid = req.params.cid || undefined
        const pid = req.params.pid || undefined
        const result = cartManager.updateProductQuantity(cid, pid, updatedProduct)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send("Error: " + error.message)
    }
})

export default router