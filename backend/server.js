const express = require('express');
const cors = require('cors');
const authRoutes = require('./rotes/auth');
const labRoutes = require('./routes/labs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/labs', labRoutes);

app.listed(3000,()=>{
    console.log('Server running on http://localhost:3000');
});