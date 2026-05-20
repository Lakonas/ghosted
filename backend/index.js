const express = require('express');
const cors = require('cors');
require('dotenv').config();
const applicationsRoutes = require('./routes/applications');

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: ['https://ghosted-psi.vercel.app', 'http://localhost:5173']
}));
app.use(express.json());
app.use('/api/applications', applicationsRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
console.log('DB_PORT:', process.env.DB_PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});