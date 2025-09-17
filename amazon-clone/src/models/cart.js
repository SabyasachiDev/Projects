const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to calculate cart totals
cartSchema.methods.calculateTotals = function() {
  const subtotal = this.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
  
  const tax = subtotal * 0.1; // Assume 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;
  
  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2)
  };
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;