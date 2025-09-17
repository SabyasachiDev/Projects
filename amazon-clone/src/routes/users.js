const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  res.render('users/login', { 
    title: 'Login',
    user: null,
    error: null
  });
});

// Register page
router.get('/register', (req, res) => {
  res.render('users/register', { 
    title: 'Register',
    user: null,
    error: null
  });
});

// Process login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock user data (would come from database in a real app)
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456'
    }
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.render('users/login', {
      title: 'Login',
      user: null,
      error: 'Invalid email or password'
    });
  }

  // In a real app, you would use bcrypt to compare passwords
  // and never store plain text passwords

  // Set user session
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  res.redirect('/');
});

// Process registration
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input
  if (!name || !email || !password || !confirmPassword) {
    return res.render('users/register', {
      title: 'Register',
      user: null,
      error: 'All fields are required'
    });
  }

  if (password !== confirmPassword) {
    return res.render('users/register', {
      title: 'Register',
      user: null,
      error: 'Passwords do not match'
    });
  }

  // In a real app, you would:
  // 1. Check if user already exists
  // 2. Hash the password using bcrypt
  // 3. Save the user to the database

  // Mock successful registration
  req.session.user = {
    id: Date.now(),
    name,
    email
  };

  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// User profile
router.get('/profile', (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/users/login');
  }

  res.render('users/profile', {
    title: 'My Profile',
    user: req.session.user
  });
});

module.exports = router;