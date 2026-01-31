const pool = require('../config/db');

class ProductRepository {

    async findAll() {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }

    async findbyId(id) {
        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    async findBySku(sku) {
        const result = await pool.query(
            'SELECT * FROM products WHERE sku = $1',
            [sku]
        );
        return result.rows[0];
    }

    async create(product) {
        const { descripcion, price, stock, sku } = product;

        const result = await pool.query(
            `INSERT INTO products (descripcion, price, stock, sku)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [descripcion, price, stock, sku]
        );

        return result.rows[0];
    }

    async update(id, product) {
        const fields = [];
        const values = [];
        let index = 1;

        for (const key in product) {
            fields.push(`${key} = $${index}`);
            values.push(product[key]);
            index++;
        }

        values.push(id);

        const query = `
            UPDATE products
            SET ${fields.join(', ')}
            WHERE id = $${index}
            RETURNING *
        `;

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = new ProductRepository();
