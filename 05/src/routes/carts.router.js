import { Router } from 'express'
import CartManager from '../CartManager.js'

const router = Router()

const cartManager = new CartManager('./json/carts.json')

router.post('/', async (req, res) => {
    try {
        const products = req.body
        const result = await cartManager.createCart(products)
        res.status(result[0]).send(result[1])

    } catch (error) {
        res.status(500).send('Error al ingresar el carrito')
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid) || undefined
        const cart = await cartManager.getCartById(cid)
        res.send(cart)
    } catch (error) {
        res.status(500).send('Error al obtener el carrito')
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid) || undefined
        const pid = parseInt(req.params.pid) || undefined
        const result = await cartManager.addToCart(cid, pid)
        res.status(result[0]).send(result[1])
    } catch (error) {
        res.status(500).send('Error al editar el carrito: ' + error)
    }
})

export default router