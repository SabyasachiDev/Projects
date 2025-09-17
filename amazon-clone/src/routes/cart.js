const express = require('express');
const router = express.Router();

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/users/login');
};

// View cart
router.get('/', isAuthenticated, (req, res) => {
  // Initialize cart in session if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Calculate total price
  const total = req.session.cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  res.render('cart/index', {
    title: 'Shopping Cart',
    cartItems: req.session.cart,
    total: total.toFixed(2),
    user: req.session.user
  });
});

// Add item to cart
router.post('/add', isAuthenticated, (req, res) => {
  const { productId, quantity } = req.body;
  const parsedProductId = parseInt(productId);
  const parsedQuantity = parseInt(quantity) || 1;

  // Mock product data (would come from database in a real app)
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      image: '/images/headphones.jpg'
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 699.99,
      image: '/images/smartphone.jpg'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 89.99,
      image: '/images/shoes.jpg'
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 49.99,
      image: '/images/coffee-maker.jpg'
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      price: 79.99,
      image: '/images/fitness-tracker.jpg'
    },
    {
      id: 6,
      name: 'Laptop',
      price: 1299.99,
      image: '/images/laptop.jpg'
    }
  ];

  const product = products.find(p => p.id === parsedProductId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Initialize cart in session if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Check if product is already in cart
  const existingItemIndex = req.session.cart.findIndex(item => item.id === parsedProductId);

  if (existingItemIndex !== -1) {
    // Update quantity if product already in cart
    req.session.cart[existingItemIndex].quantity += parsedQuantity;
  } else {
    // Add new item to cart
    req.session.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: parsedQuantity
    });
  }

  res.redirect('/cart');
});

// Update cart item quantity
router.post('/update', isAuthenticated, (req, res) => {
  const { productId, quantity } = req.body;
  const parsedProductId = parseInt(productId);
  const parsedQuantity = parseInt(quantity);

  if (!req.session.cart) {
    return res.redirect('/cart');
  }

  // Find item in cart
  const itemIndex = req.session.cart.findIndex(item => item.id === parsedProductId);

  if (itemIndex === -1) {
    return res.redirect('/cart');
  }

  if (parsedQuantity <= 0) {
    // Remove item if quantity is 0 or negative
    req.session.cart.splice(itemIndex, 1);
  } else {
    // Update quantity
    req.session.cart[itemIndex].quantity = parsedQuantity;
  }

  res.redirect('/cart');
});

// Remove item from cart
router.post('/remove', isAuthenticated, (req, res) => {
  const { productId } = req.body;
  const parsedProductId = parseInt(productId);

  if (!req.session.cart) {
    return res.redirect('/cart');
  }

  // Remove item from cart
  req.session.cart = req.session.cart.filter(item => item.id !== parsedProductId);

  res.redirect('/cart');
});

// Checkout page
router.get('/checkout', isAuthenticated, (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/cart');
  }

  // Calculate total price
  const total = req.session.cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  res.render('cart/checkout', {
    title: 'Checkout',
    cartItems: req.session.cart,
    total: total.toFixed(2),
    user: req.session.user
  });
});

// Process checkout
router.post('/checkout', isAuthenticated, (req, res) => {
  // In a real app, you would:
  // 1. Validate shipping and payment information
  // 2. Process payment through a payment gateway
  // 3. Create an order in the database
  // 4. Clear the cart

  // Mock successful checkout
  req.session.cart = [];
  
  res.render('cart/confirmation', {
    title: 'Order Confirmation',
    orderNumber: `ORD-${Date.now()}`,
    user: req.session.user
  });
});

module.exports = router;