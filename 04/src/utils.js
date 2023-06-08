import { fileURLToPath } from 'url'
import { dirname } from 'path'
import ProductManager from './ProductManager.js'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export async function productsUpdate(io){
    const productManager = new ProductManager('./src/json/products.json')
    const products = await productManager.getProducts()
    io.emit('productsUpdate', products)
}