const express = require('express');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'amazon-clone-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/amazon-clone',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Global variables middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  res.locals.cartCount = req.session.cartCount || 0;
  next();
});

// Import routes
const indexRoutes = require('./src/routes/index');
const productRoutes = require('./src/routes/products');
const userRoutes = require('./src/routes/users');
const cartRoutes = require('./src/routes/cart');

// Use routes
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});