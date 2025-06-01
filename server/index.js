import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import alertRoutes from './routes/alerts.js';
import { seedDatabase } from './utils/seed.js';


// Load environment variables
dotenv.config();

const app = express();
// Create Express app
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/grid-manager';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Seed the database with initial data
    seedDatabase();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Grid Manager API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});