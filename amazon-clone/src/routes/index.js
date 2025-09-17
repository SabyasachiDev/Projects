const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Amazon Clone - Home',
    user: req.session.user || null
  });
});

// About page route
router.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us',
    user: req.session.user || null
  });
});

// Contact page route
router.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us',
    user: req.session.user || null
  });
});

module.exports = router;