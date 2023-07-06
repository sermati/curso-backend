// PRODUCT MANAGER VIEJO (FILE SYSTEM), SE PEDIA EN EL POWER QUE NO SE ELIMINE.

import fs from 'fs'

export class Product {
    constructor(product){
        this.id = product.id
        this.title = product.title
        this.price = product.price
        this.thumbnail = product.thumbnail
        this.code = product.code
        this.stock = product.stock
    }
}

export default class ProductManager {

    constructor(route){
        this.path = route
        this.products = []
    }

    async saveToFile(){
        const products_json = JSON.stringify(this.products)
        await fs.promises.writeFile(this.path, products_json)
    }

    async getProducts(limit){

        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path, 'utf8')
            const parsedProducts = JSON.parse(products)
            const limitedProducts = limit ? parsedProducts.slice(0, limit) : parsedProducts
            this.products = limitedProducts
            return this.products
        } else {
            this.products = []
            return JSON.stringify(this.products)
        }

    }

    async getProductById(id){
        try {
            await this.getProducts()
            const findProduct = this.products.find(p => p.id === id)
            return ( findProduct == undefined ) ? 'Not Found' : findProduct
        } catch (error) {
            console.log('Hubo un error al buscar el producto solicitado. Error: ' + error)
            return 'error'
        }
    }

    async addProduct(product){
        await this.getProducts()
        const validateCode = this.products.find( p => p.code === product.code )
        const products_values = Object.values(product)
        const validateProducts = products_values.filter( p => p === '' )

        if (!validateCode){

            if (validateProducts.length === 0) {

                let max = 0
                this.products.forEach(p => {
                    max = Math.max(max, p.id)
                })

                const id = (this.products.length === 0) ? 1 : max + 1

                try {
                    const newProduct = new Product({id, ...product})
                    this.products.push(newProduct)
                    await this.saveToFile()
                    return [201, 'Agregado correctamente']
                } catch (error) {
                    return [400, 'Error: ' + error]
                }

            }else{
                return [400, 'No puede haber campos vacios']
            }

        }else{
            return [400, 'Este elemento ya existe']
        }

    }

    async deleteProduct(id){
        await this.getProducts()
        const index = this.products.findIndex( p => p.id === id)
        if ( index === -1){
            return 'Producto no encontrado'
        }else{
            this.products.splice(index, 1)
            await this.saveToFile()
            return 'Producto eliminado correctamente'
            
        }
    }

    async updateProduct(id, newData){
        await this.getProducts()
        const index = this.products.findIndex( p => p.id === id)
        if (index === -1){
            return [400, 'Producto no encontrado']
        }else{
            const updatedProduct = {
                ...this.products[index],
                ...newData
            }

            console.log(updatedProduct)
            this.products[index] = updatedProduct
            await this.saveToFile()
            return [200, 'Producto actualizado correctamente']
        }
    }

}