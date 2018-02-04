const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Setting up passport
const googleOauthKeys = {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', // if we leave it as a relative path, it will default to HTTP protocol if there is a proxy in the way, like in heroku's case.
    proxy: true // Lets the strategy to trust the proxy present in heroku.
};

passport.serializeUser((user, done) => done(null, user.id) );

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user));
});

// Setup the google strategy
const googleStrategy = new GoogleStrategy(googleOauthKeys, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id});

    if (existingUser) {
        console.log('user exists ');
        console.log(existingUser);

        done(null, existingUser);
        return;
    }
    console.log('creating new user');
    const newUser = await new User({ googleId: profile.id }).save();
    done(null, newUser);

});

passport.use(googleStrategy);

///////////////////////////////////

// Handlers
