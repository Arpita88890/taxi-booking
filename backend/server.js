const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taxiRoutes = require('./routes/taxiRoutes');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes for authentication and taxi bookings
app.use('/api/auth', authRoutes);
app.use('/api', taxiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Taxi booking server running on http://localhost:${port}`);
});
