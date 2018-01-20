const mongoose = require('mongoose');
const { Schema } = mongoose; // Same as 'const Scheme = mongoose.Scheme;'

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);
