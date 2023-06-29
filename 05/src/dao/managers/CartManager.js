import CartsModel from '../models/carts.model.js'
import ProductsModel from '../models/products.model.js'

export default class CartManager {

    constructor() {
        this.cartModel = CartsModel
        this.productModel = ProductsModel
        this.cart = []
    }

    async getCart(id) {
        const cartData = await this.cartModel.findOne({ _id: id })
        return cartData
    }

    async createCart() {
        try {
            const newCart = await this.cartModel.create({ products: [] })
            return newCart
        } catch (error) {
            return error.message
        }
    }

    async addToCart(cid, pid) {

        try {
            const cart = await this.cartModel.findById(cid)
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }
            if (!pid) {
                throw new Error('ID es requerido')
            }
            const product = await this.productModel.findById(pid)
            if (!product) {
                throw new Error('Producto no encontrado')
            }
            const existingProduct = cart.products.find((p) => p.productId === pid)
            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                cart.products.push({ productId: pid, quantity: 1 })
            }
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(`Error al agregar productos al carrito: ${error.message}`)
        }

    }

}