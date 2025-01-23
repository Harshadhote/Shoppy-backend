const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,  // Add the controller for updating
    deleteProduct   // Add the controller for deleting
} = require('../Controllers/productController');

// Routes
router.get('/products', getProducts); // Get all products
router.get('/products/:id', getProductById); // Get product by ID
router.post('/products', createProduct); // Create a new product
router.put('/products/:id', updateProduct); // Update product by ID
router.delete('/products/:id', deleteProduct); // Delete product by ID

module.exports = router;
