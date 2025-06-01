import User from '../models/User.js';
import PowerData from '../models/PowerData.js';
import dayjs from 'dayjs';

export const seedDatabase = async () => {
  try {
    // Check if default user exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminExists) {
      // Create default admin user
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Default admin user created');
    }
    
    // Check if power data exists
    const dataExists = await PowerData.countDocuments();
    
    if (dataExists === 0) {
      // Generate mock power data
      const today = dayjs();
      const powerData = [];
      
      // Generate data points for every 30 minutes for a day
      for (let i = 0; i < 24; i++) {
        const time = today.hour(i).minute(0).second(0);
        
        // Generate random values between 40 and 60
        const dk1 = 40 + Math.random() * 20;
        const dk2 = 40 + Math.random() * 20;
        const dkGas = 40 + Math.random() * 20;
        
        powerData.push(new PowerData({
          timestamp: time.toDate(),
          dk1,
          dk2,
          dkGas
        }));
        
        // Add data point for 30 minutes later
        const time30 = today.hour(i).minute(30).second(0);
        const dk1_30 = 40 + Math.random() * 20;
        const dk2_30 = 40 + Math.random() * 20;
        const dkGas_30 = 40 + Math.random() * 20;
        
        powerData.push(new PowerData({
          timestamp: time30.toDate(),
          dk1: dk1_30,
          dk2: dk2_30,
          dkGas: dkGas_30
        }));
      }
      
      await PowerData.insertMany(powerData);
      console.log('Mock power data created');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};