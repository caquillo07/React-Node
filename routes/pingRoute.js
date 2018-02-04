const mongoose = require('mongoose');

module.exports = (app) => {
    app.get('/ping', (req, res) => {
        const pong = {
            status: 'ALIVE',
            database: {
                mongoDB: getDBStateMessage()
            }
        };

        res.send(pong);
    })
};


/////////////////////////////////

// Helpers
const getDBStateMessage = () => {
    const status = mongoose.connection.readyState;
    let message = '';

    switch (status) {
        case 0:
            message = 'DISCONNECTED';
            break;
        case 1:
            message = 'CONNECTED';
            break;
        case 2:
            message = 'CONNECTING';
            break;
        case 3:
            message = 'DISCONNECTING';
            break;
        case 4:
            message = 'TROUBLE VALIDATING CREDENTIALS';
            break;
        default:
            message = 'SOME UNKNOWN ERROR OCURRED GETTING STATE'
    }

    return {
        status: status,
        message: message
    };
};