import ProductsModel from "../models/products.model.js"

export class Product {
    constructor(product) {
        this.id = product.id
        this.title = product.title
        this.price = product.price
        this.thumbnail = product.thumbnail
        this.code = product.code
        this.stock = product.stock
    }
}

export default class ProductManager {

    constructor() {
        this.productsModel = ProductsModel
        this.products = []
    }

    async getProducts(limit) {
        try {
            let query = this.productsModel.find()
            if (limit) {
                query = query.limit(limit)
            }
            const products = await query.exec()
            this.products = products
            return this.products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        const productData = await this.productsModel.findOne({ _id: id })
        // O Tambien: const productData = await this.productsModel.findById()
        return productData
    }

    async addProduct(product) {
        try {
            const newProduct = await this.productsModel.create(product)
            this.products.push(newProduct)
            return [201, 'Agregado correctamente']
        } catch (error) {
            return [400, 'Error: ' + error]
        }
    }

    async updateProduct(id, newData) {

        try {
            const productData = await this.productsModel.updateOne({ _id: id }, newData)
            return [200, productData]
        } catch (error) {
            return [400, 'No se pudo actualizar el producto']
        }
    }

    async deleteProduct(id) {
        try {
            const productDeleted = await this.productsModel.deleteOne({ _id: id })
            return [200, productDeleted]
        } catch (error) {
            return [400, 'No se pudo eliminar el producto']
        }
    }

}