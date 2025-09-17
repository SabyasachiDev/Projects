const express = require('express');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  // Mock product data (would come from database in a real app)
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: '/images/headphones.jpg',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 699.99,
      description: 'Latest smartphone with advanced camera and long battery life',
      image: '/images/smartphone.jpg',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 89.99,
      description: 'Comfortable running shoes with excellent support',
      image: '/images/shoes.jpg',
      category: 'Fashion'
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 49.99,
      description: 'Programmable coffee maker with thermal carafe',
      image: '/images/coffee-maker.jpg',
      category: 'Home & Kitchen'
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      price: 79.99,
      description: 'Track your steps, heart rate, and sleep patterns',
      image: '/images/fitness-tracker.jpg',
      category: 'Electronics'
    },
    {
      id: 6,
      name: 'Laptop',
      price: 1299.99,
      description: 'Powerful laptop for work and entertainment',
      image: '/images/laptop.jpg',
      category: 'Electronics'
    }
  ];

  res.render('products/index', { 
    title: 'All Products',
    products,
    user: req.session.user || null
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Mock product data (would come from database in a real app)
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: '/images/headphones.jpg',
      category: 'Electronics',
      details: 'Experience crystal-clear sound with these premium wireless headphones. Features include active noise cancellation, 30-hour battery life, comfortable over-ear design, and seamless Bluetooth connectivity.'
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 699.99,
      description: 'Latest smartphone with advanced camera and long battery life',
      image: '/images/smartphone.jpg',
      category: 'Electronics',
      details: 'Stay connected with this cutting-edge smartphone featuring a 6.5-inch OLED display, 5G connectivity, triple-lens camera system, all-day battery life, and the latest processor for lightning-fast performance.'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 89.99,
      description: 'Comfortable running shoes with excellent support',
      image: '/images/shoes.jpg',
      category: 'Fashion',
      details: 'Elevate your running experience with these lightweight, breathable shoes designed for maximum comfort and support. Features include responsive cushioning, durable outsole, and stylish design for both performance and casual wear.'
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 49.99,
      description: 'Programmable coffee maker with thermal carafe',
      image: '/images/coffee-maker.jpg',
      category: 'Home & Kitchen',
      details: 'Wake up to freshly brewed coffee with this programmable coffee maker. Features include 24-hour programmability, brew strength control, self-cleaning function, and a thermal carafe that keeps coffee hot for hours.'
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      price: 79.99,
      description: 'Track your steps, heart rate, and sleep patterns',
      image: '/images/fitness-tracker.jpg',
      category: 'Electronics',
      details: 'Achieve your fitness goals with this advanced tracker that monitors your activity, heart rate, sleep quality, and more. Water-resistant design, week-long battery life, and smartphone notifications keep you connected and motivated.'
    },
    {
      id: 6,
      name: 'Laptop',
      price: 1299.99,
      description: 'Powerful laptop for work and entertainment',
      image: '/images/laptop.jpg',
      category: 'Electronics',
      details: 'Boost your productivity with this high-performance laptop featuring a stunning 15.6-inch display, powerful processor, ample storage, dedicated graphics card, and all-day battery life perfect for work and entertainment.'
    }
  ];

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).render('404', { 
      title: 'Product Not Found',
      user: req.session.user || null
    });
  }

  res.render('products/detail', { 
    title: product.name,
    product,
    user: req.session.user || null
  });
});

// Search products
router.post('/search', (req, res) => {
  const { query } = req.body;
  
  // Mock product data (would come from database in a real app)
  const allProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: '/images/headphones.jpg',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 699.99,
      description: 'Latest smartphone with advanced camera and long battery life',
      image: '/images/smartphone.jpg',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 89.99,
      description: 'Comfortable running shoes with excellent support',
      image: '/images/shoes.jpg',
      category: 'Fashion'
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: 49.99,
      description: 'Programmable coffee maker with thermal carafe',
      image: '/images/coffee-maker.jpg',
      category: 'Home & Kitchen'
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      price: 79.99,
      description: 'Track your steps, heart rate, and sleep patterns',
      image: '/images/fitness-tracker.jpg',
      category: 'Electronics'
    },
    {
      id: 6,
      name: 'Laptop',
      price: 1299.99,
      description: 'Powerful laptop for work and entertainment',
      image: '/images/laptop.jpg',
      category: 'Electronics'
    }
  ];

  // Filter products based on search query
  const products = allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  res.render('products/search', { 
    title: 'Search Results',
    products,
    query,
    user: req.session.user || null
  });
});

module.exports = router;