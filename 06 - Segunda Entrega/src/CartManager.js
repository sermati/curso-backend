// CART MANAGER VIEJO (FILE SYSTEM), SE PEDIA EN EL POWER QUE NO SE ELIMINE.

import fs from 'fs'

export default class CartManager {

    constructor(route) {
        this.path = route
        this.carts = []
    }

    async saveToFile() {
        const carts_json = JSON.stringify(this.carts)
        await fs.promises.writeFile(this.path, carts_json)
    }

    async getCarts(limit) {

        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf8')
            const parsedCarts = JSON.parse(carts)
            const limitedCarts = limit ? parsedCarts.slice(0, limit) : parsedCarts
            this.carts = limitedCarts
            return this.carts
        } else {
            this.carts = []
            return JSON.stringify(this.carts)
        }

    }

    async getCartById(id) {
        try {
            await this.getCarts()
            const findCart = this.carts.find(p => p.id === id)
            return (findCart == undefined) ? 'Not Found' : findCart
        } catch (error) {
            console.log('Hubo un error al buscar el carrito solicitado. Error: ' + error)
            return 'error'
        }
    }

    async createCart(products = []) {

        let max = 0
        this.carts.forEach(p => {
            max = Math.max(max, p.id)
        })

        const cartId = (this.carts.length === 0) ? 1 : max + 1

        const newCart = {
            id: cartId,
            products: {
                pid: products.id,
                quantity: 1
            }
        }
        this.carts.push(newCart)
        await this.saveToFile()
        return [200, 'Carrito Creado']
    }

    async addToCart(cid, pid) {
        await this.getCarts()
        const cart = this.carts.find(cart => cart.id === cid)
        if (!cart) {
            return [404, 'Carrito no encontrado']
        }
        const existing = cart.products.find(p => p.pid === pid)
        if (existing) {
            existing.quantity++
        } else {
            cart.products.push({ pid, quantity: 1 })
        }
        await this.saveToFile()
        return [200, 'Carrito Actualizado']
    }

}