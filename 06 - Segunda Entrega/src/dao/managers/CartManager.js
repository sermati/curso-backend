import CartsModel from '../models/carts.model.js'
import ProductsModel from '../models/products.model.js'

export default class CartManager {

    constructor() {
        this.cartModel = CartsModel
        this.productModel = ProductsModel
        this.cart = []
    }

    async getCart(id) {
        const cart = await this.cartModel.findOne({ _id: id })
        if (!cart) {
            return [400, 'Carrito no encontrado']
        }
        return cart
    }

    async createCart() {
        try {
            const newCart = await this.cartModel.create({ products: [] })
           return [201, 'Carrito creado']
        } catch (error) {
            return [500, 'Error al crear el carrito: ' + error.message]
        }
    }

    async addToCart(cid, pid) {

        try {
            const cart = await this.cartModel.findById(cid)
            if (!cart) {
                return [400, 'Carrito no encontrado']
            }
            if (!pid) {
                return [500, 'ID es requerido']
            }
            const product = await this.productModel.findById(pid)
            if (!product) {
                return [400, 'Producto no encontrado']
            }
            const existingProduct = cart.products.find((p) => p.product === pid)
            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                cart.products.push({ product: pid, quantity: 1 })
            }
            await cart.save()
            return [200, cart]
        } catch (error) {
            return [500, 'Error al agregar productos al carrito: ' + error.message]
        }

    }

    async deleteFromCart(cid, pid) {
        try {
            const cart = await this.cartModel.findById(cid)
            if (!cart) {
                return [400, 'Carrito no encontrado']
            }
            if (!pid) {
                return [500, 'ID del producto es requerido']
            }
            const existingProduct = cart.products.find((p) => p.product._id.toString() === pid)
            if (!existingProduct) {
                return [400, 'Producto no encontrado en el carrito']
            }
            existingProduct.quantity -= 1;
            if (existingProduct.quantity === 0) {
                cart.products = cart.products.filter((p) => p.product._id.toString() !== pid)
            }
            await cart.save()
            return [200, 'Producto eliminado del carrito']
        } catch (error) {
            return [500, 'Error al eliminar del carrito ' + error.message]
        }
    }

    async emptyCart(cid) {
        try {
            const cart = await this.cartModel.findById(cid);
            if (!cart) {
                return [400, 'Carrito no encontrado']
            }
            cart.products = []
            await cart.save()
            return [200, 'Carrito vaciado correctamente']
        } catch (error) {
            return [500, 'Error al vaciar el carrito ' + error.message]
        }
    }

    async updateProductsFromCart(cartId, updatedProducts) {
        try {
            const cart = await this.cartModel.findById(cartId)
            if (!cart) {
                return [400, 'Carrito no encontrado']
            }
            cart.products = updatedProducts
            await cart.save()
            return [200, 'Se agrego correctamente']
        } catch (error) {
            return [500, 'Hubo un error: ' + error.message]
        }
    }

    async updateProductQuantity(cartId, prodId, updatedProduct) {
        try {
            const cart = await this.cartModel.findById(cartId)
            if (!cart) {
                return [400, 'Carrito no encontrado']
            }
            const product = cart.products.find(prod => prod.product === prodId)
            if (product) {
                product.quantity = updatedProduct.quantity
                await cart.save()
                return [200, 'Se agrego correctamente']
            } else {
                return [400, 'Producto no encontrado en carrito']
            }
        } catch (error) {
            return [500, 'Hubo un error: ' + error.message]
        }
    }

}