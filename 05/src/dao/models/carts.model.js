import mongoose from "mongoose"

const collectionCarts = "carts"

const cartSchema = new mongoose.Schema({

    cartNumber: {

        products: {

            type: String,
            required: true,
            unique: true,
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
            
        }

    }

})

const cartModel = mongoose.model(collectionCarts, cartSchema)

export default cartModel