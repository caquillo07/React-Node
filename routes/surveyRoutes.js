const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTempalte = require('../services/emailTemplates/surveyTemplate');

// Models
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        "use strict";
        res.send('Thank you for taking the survey!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // Creating an array of objects that match the Recipients schema, and then building
        // the survey to save on the DB.
        const survey = new Survey({
            title, // ES6 syntax, if the key and value match, just write it once.
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTempalte(survey));

        try {
            await mailer.send();
            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
