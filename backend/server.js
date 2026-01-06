const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const labRoutes = require('./routes/lab');
const path = require('path');


const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// 🔹 Homepage → index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 🔹 API routes
app.use('/api/auth', authRoutes);
app.use('/api/lab', labRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});