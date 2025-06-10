require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const ocrRoutes = require('./src/routes/ocr');
const authRoutes = require('./src/routes/authRoutes'); 
const expenseRoutes = require('./src/routes/expenseRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/finance-tracker', {
}).then(() => console.log("MongoDB connected"));


app.use('/api/auth', authRoutes);      
app.use('/api/expenses', expenseRoutes); 
app.use('/api/ocr', ocrRoutes);        

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
