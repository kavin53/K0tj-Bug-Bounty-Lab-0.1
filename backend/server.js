const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const labRoutes = require('./routes/lab');
const path = require('path');
const resetVuln = require('./routes/reset-vuln');


const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


app.use('/api/auth', authRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/reset-vuln', resetVuln);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});