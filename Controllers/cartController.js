const Cart = require('../Models/Cart');
const Product = require('../Models/Product');

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

    const newCartItem = new Cart({ productId, quantity });
    await newCartItem.save();

    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update cart item
exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await Cart.findOne({ productId });
    if (!cartItem) return res.status(404).send('Cart item not found');

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete cart item
exports.deleteFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).send('Cart item not found');
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
