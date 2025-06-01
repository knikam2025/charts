import express from 'express';
import Alert from '../models/Alert.js';
import PowerData from '../models/PowerData.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all alerts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const alerts = await Alert.find({ createdBy: req.userId }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new alert
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, criteria, value, days, email, phone } = req.body;
    
    const alert = new Alert({
      name,
      criteria,
      value,
      days,
      email,
      phone,
      createdBy: req.userId
    });
    
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete alert
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    // Check if the alert belongs to the user
    if (alert.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await alert.deleteOne();
    res.json({ message: 'Alert removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update alert
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    if (alert.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { name, criteria, value, days, email, phone } = req.body;
    alert.name = name;
    alert.criteria = criteria;
    alert.value = value;
    alert.days = days;
    alert.email = email;
    alert.phone = phone;
    await alert.save();
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get power data for graph
router.get('/power-data', authMiddleware, async (req, res) => {
  try {
    const powerData = await PowerData.find().sort({ timestamp: 1 });
    res.json(powerData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;