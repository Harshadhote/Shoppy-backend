const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Async function to connect to MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1); 
    }
  };

// Connect to MongoDB
connectDB();


// Use routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
