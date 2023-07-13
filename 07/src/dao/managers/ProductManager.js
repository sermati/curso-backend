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

    async getProducts(limit, page, sort, category, available) {
        try {
            let filter = {}
            if (category) {
                filter = { category: category }
            }
            if (available) {
                // $gt selects those documents where the value of the field is greater than (i.e. > ) the specified value
                filter.stock = { $gt: 0 }
            }
            let products = await this.productsModel.paginate(filter, {
                lean: true,
                limit: limit || 10,
                page: page || 1,
                sort: sort === 'asc' ? {price: 1} : sort === 'desc' ? {price: -1} : undefined
            })
            this.products = products
            return this.products
        } catch (error) {
            return 'Hubo un error al obtener los productosss. ' + error
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