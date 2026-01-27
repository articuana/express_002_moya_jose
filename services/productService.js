const productRepository = require('../repositories/productRepository');
//en la capa de servicio se maneja la logica de negocio como las validaciones
const ProductService = {

    findAll() {
        const products = productRepository.findAll();
        return {
            products,
            total: products.length
        };
    },

    searchById(id) {
        const numericId = parseInt(id);
        // http status:
        // 200 ok
        // 400 algo esta mal del lado del request
            // 400 bad request 
            // 404 no encontrado
            // 403 prohibido
            // 401 no autorizado
        // 500 algo esta mal del lado del servidor
        if (isNaN(numericId)) {

            throw {
                status: 400,
                message: "ID must be a numeric number"
            };
        }

        const product = productRepository.findbyId(numericId);

        if (!product) {
            throw {
                status: 404,
                message: `Product with id ${numericId} not found`
            };
        }

        return product;
    },

    create(newProduct) {
        const { descripcion, price, stock, sku } = newProduct;

        // Validaciones
        if (descripcion == null || sku == null || price == null || stock == null) {
            throw {
                status: 400,
                message: "Missing fields"
            };
        }

        if (typeof price !== 'number' || price <= 0) {
            throw {
                status: 400,
                message: "Price must be a number greater than 0"
            };
        }

        if (typeof stock !== 'number' || stock < 0) {
            throw {
                status: 400,
                message: "Stock must be a number greater than or equal to 0"
            };
        }

        const existingSku = productRepository.findBySku(sku);
        if (existingSku) {
            throw {
                status: 400,
                message: "SKU already exists"
            };
        }

        return productRepository.create({
            descripcion: descripcion.trim(),
            price,
            stock,
            sku: sku.trim()
        });
    },

    update(id, product) {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            throw {
                status: 400,
                message: "ID must be numeric"
            };
        }

        const updated = productRepository.update(numericId, product);
        if (!updated) {
            throw {
                status: 404,
                message: `Product with id ${numericId} not found`
            };
        }

        return updated;
    },

    delete(id) {
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
            throw {
                status: 400,
                message: "ID must be numeric"
            };
        }

        const deleted = productRepository.delete(numericId);
        if (!deleted) {
            throw {
                status: 404,
                message: `Product with id ${numericId} not found`
            };
        }

        return deleted;
    }
};

module.exports = ProductService;

