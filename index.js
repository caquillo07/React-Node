const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

app.get('/cookies', (req, res) => {
    res.send({hi: 'there, this is cookies route!'});
});


// Dynamic PORT
const PORT= process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
