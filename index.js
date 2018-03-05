const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())


app.use('/', routes);

let dbConnection = mongoose.connect('mongodb://localhost/api', (err, connection) => {
    if(err) {
        console.log('Error In Data Base Connection');
    }
    else{
        console.log('Data Base Is Ready')
    }
});


app.listen(port, () => console.log('Server Is Up And Running'))


