import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  criteria: {
    type: String,
    enum: ['Greater', 'Less'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  days: {
    type: Array,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;