class ProductRepository {
    constructor() {
        this.products = [
            {
                id: 1,
                descripcion: 'Producto 1',
                price: 899.99,
                stock: 10,
                sku: 'PROD001'
            },
            {
                id: 2,
                descripcion: 'Producto 2',
                price: 1299.99,
                stock: 5,
                sku: 'PROD002'
            },
            {
                id: 3,
                descripcion: 'Producto 3',
                price: 1599.99,
                stock: 8,
                sku: 'PROD003'
            }
        ];
    }
    //Todo repositorio debe tener al menos los sigueintes metodos
    findAll() {
        return this.products;
    }

    findbyId(id){
        return this.products.find(product => product.id === id);
    }

    findBySku(sku){
        return this.products.find(product => product.sku === sku);
    }

    create(product){
        const newProduct = {
            id: this.products.length + 1,
            ...product // Agrega todas las propiedades del objeto product
            //descripcion: product.descripcion,
            //price: product.price,
            //stock: product.stock,
        }
        this.products.push(newProduct);
        return newProduct;
    }

    update(id, product){
        const productIndex = this.products.findIndex(p => p.id === id);

        //early stopping

        if (productIndex == -1) {
            return null; 
        }

        //update 4, {stock: 18, id: 888888}
        //actualizar a la fuerza
        //this.products[productIndex] = product

        //actualizar usando spread operator   
        this.products[productIndex] = {
            ...this.products[productIndex], 
            ...product,
            id //asegurarse de que el id no se actualiza
        }

        return this.products[productIndex];
    }
    delete(id){
        const index = this.products.findIndex(p => p.id === id);

        //early stopping
        if (index == -1) {
            return null;
        }

        //javascript te provee de un metodo para eliminar un objeto
        // de un arreglo y al mismo tiempo obtenerlo
        //se llama splice

        const deletedProducts = this.products.splice(index, 1); //retorna un arreglo

        return deletedProducts[0]; //retorna el primer elemento del arreglo
    }
}

module.exports = new ProductRepository();
