const socket = io()

const updateProduct = (products) => {
    const productsContainer = document.getElementById('productsContainer')
    productsContainer.innerHTML = ''
    
    products.forEach(product => {
        const productCard = document.createElement('div')
        productCard.innerHTML = ''
        productCard.innerHTML = `
            <h2>${product.title}</h2>
            <p>$ ${product.price}</p>
            <p>Codigo: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
        `
        productsContainer.append(productCard)
    })
}

socket.on('connect', () => {
    socket.emit('newConnection', socket.id)
})

socket.on('productsUpdate', (products) => {
    updateProduct(products)
})