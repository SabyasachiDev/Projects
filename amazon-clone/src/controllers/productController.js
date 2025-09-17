const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products/index', { 
      title: 'All Products',
      products 
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).render('error', { 
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('404', { 
        title: 'Product Not Found' 
      });
    }
    
    res.render('products/detail', { 
      title: product.name,
      product 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).render('error', { 
      message: 'Error fetching product',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    
    res.render('products/index', { 
      title: `${category} Products`,
      products,
      category 
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).render('error', { 
      message: 'Error fetching products by category',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.redirect('/products');
    }
    
    // Search in name, description, and brand fields
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.render('products/search', { 
      title: 'Search Results',
      products,
      query 
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).render('error', { 
      message: 'Error searching products',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
};

// Get featured products for homepage
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true }).limit(8);
    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// Admin: Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, featured, discount } = req.body;
    
    // Handle image upload (assuming multer middleware is used)
    const images = req.files ? req.files.map(file => `/images/${file.filename}`) : [];
    
    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
      featured: featured === 'on',
      discount: discount || 0
    });
    
    await product.save();
    
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).render('admin/products/create', { 
      title: 'Create Product',
      error: 'Failed to create product',
      product: req.body
    });
  }
};

// Admin: Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, featured, discount } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('404', { 
        title: 'Product Not Found' 
      });
    }
    
    // Update product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.stock = stock;
    product.featured = featured === 'on';
    product.discount = discount || 0;
    
    // Handle image upload if new images are provided
    if (req.files && req.files.length > 0) {
      product.images = req.files.map(file => `/images/${file.filename}`);
    }
    
    await product.save();
    
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).render('admin/products/edit', { 
      title: 'Edit Product',
      error: 'Failed to update product',
      product: { ...req.body, _id: req.params.id }
    });
  }
};

// Admin: Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete product'
    });
  }
};