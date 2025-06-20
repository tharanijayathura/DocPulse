const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    require('dotenv').config();

    const app = express();
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());

    const authRoutes = require('./routes/auth');
    const doctorRoutes = require('./routes/doctor');
    const medicineRoutes = require('./routes/medicine');

    app.use('/api/auth', authRoutes);
    app.use('/api/doctor', doctorRoutes);
    app.use('/api/medicine', medicineRoutes);

    console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log('MongoDB connection error:', err.message));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });