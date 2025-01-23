const Product = require('../Models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const newProduct = new Product({ name, price, description, stock });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).send('Product not found');

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).send('Product not found');

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};