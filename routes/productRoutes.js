const express = require('express');
const router = express.Router();

const productService = require('../services/productService');

router.get('/', (req, res) => {
    try {
        const result = productService.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const result = productService.searchById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

router.post('/', (req, res) => {
    try {
        const newProduct = productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

router.put('/:id', (req, res) => {
    try {
        const updatedProduct = productService.update(req.params.id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const deletedProduct = productService.delete(req.params.id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        });
    }
});

module.exports = router;
