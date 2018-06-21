// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
require('./models/User');
require('./models/Survey');
require('./services/passport');  // We are not returning anything, so we can just require it.

// Connect to MongoDB
mongoose.connect(keys.mongoURI)
    .then(connection => console.log('Successfully connected to MongoDB'))
    .catch(error => console.log('Failed to connect to DB!!!!!\n', error));

// Start express
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey] // If you add more than one, it will pick one at random.
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
require('./routes/authRoutes')(app);

// Ping route
require('./routes/pingRoute')(app);

// Billing routes
require('./routes/billingRoutes')(app);

// Survey routes
require('./routes/surveyRoutes')(app);

// Tell Express how to behave in prod
if (process.env.NODE_ENV === 'production') {

    // Make sure Express will serve the prod assets, like main.js and main.css files.
    app.use(express.static('client/build'));

    // Express will serve up the index.html for any unrecognized routes.
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Dynamic PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});


