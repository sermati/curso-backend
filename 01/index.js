class ProductManager {

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const findProduct = this.products.find(p => p.id === id)
        return ( findProduct == undefined ) ? 'Not Found' : findProduct
    }

    addProduct(product){

        const validateCode = this.products.find( p => p.code === product.code )
        const products_values = Object.values(product)
        const validateProducts = products_values.filter( p => p === '' )

        if (!validateCode ) {

            if (validateProducts.length === 0) {

                let max = 0
                this.products.forEach(p => {
                    max = Math.max(p.id)
                });

                const id = (this.products.length === 0) ? 1 : max + 1

                this.products.push( {
                    id,
                    ...product
                } )

            } else {
                console.error('No puede haber campos vacios')
            }

        } else {
            console.error('Este elemento ya existe')
        }

    }

}

const productManager = new ProductManager()

productManager.addProduct({
    title: "Producto uno",
    description: "Descripcion del producto 1",
    price: 100.00,
    thumbnail: "img/product1.jpg",
    code: 1,
    stock: 10
});

productManager.addProduct({
    title: "Producto dos",
    description: "Descripcion del producto 2",
    price: 0,
    thumbnail: "img/product1.jpg",
    code: 2,
    stock: 10
});

productManager.addProduct({
    title: "Producto tres",
    description: "Descripcion del producto 3",
    price: 5000,
    thumbnail: "img/product1.jpg",
    code: 3,
    stock: 10
});

console.log('getProducts(): ')
console.log(productManager.getProducts())

console.log('getProductById(3): ')
console.log(productManager.getProductById(3))