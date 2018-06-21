module.exports = (req, res, next) => {
    if (!req.user.credits > 0) {
        return res.status(403).send({ error: 'Not enough credits to create a new survey' });
    }

    next();
};
