const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables or use default local MongoDB URI
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/amazon-clone';
    
    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;