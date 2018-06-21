const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLoginMiddleware = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLoginMiddleware, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 dollars for 5 credits',
            source: req.body.id
        });

        // Passport adds the user model to the req
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};