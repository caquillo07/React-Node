// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');  // We are not returning anything, so we can just require it.

// Routes
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
mongoose.connect(keys.mongoURI)
    .then(connection => console.log('Successfully connected to MongoDB'))
    .catch(error => console.log('Failed to connect to DB!!!!!', error));

// Start express
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey] // If you add more than one, it will pick one at random.
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
authRoutes(app);

// Dynamic PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});
