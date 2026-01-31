const express = require('express');
const router = express.Router();

const productService = require('../services/productService');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const result = await productService.findAll();

    res.status(200).json({
      total: result.total,
      products: result.products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
    try {
        const result = await productService.searchById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

// CREATE
router.post('/', async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await productService.update(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await productService.delete(req.params.id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

module.exports = router;
