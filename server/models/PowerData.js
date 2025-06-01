import mongoose from 'mongoose';

const powerDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true
  },
  dk1: {
    type: Number,
    required: true
  },
  dk2: {
    type: Number,
    required: true
  },
  dkGas: {
    type: Number,
    required: true
  }
});

const PowerData = mongoose.model('PowerData', powerDataSchema);

export default PowerData;