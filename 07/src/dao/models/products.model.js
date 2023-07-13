import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    thumbnail: {
        type: [String],
        default: []
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo']
    }
})

productsSchema.plugin(mongoosePaginate)

const ProductsModel = mongoose.model(productsCollection, productsSchema)

export default ProductsModel