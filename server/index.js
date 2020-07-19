require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');


const bodyParser = require('body-parser');
const jwt = require('./../_helpers/jwt');
const errorHandler = require('./../_helpers/error-handler');

const userRoutes  = require('./../users/users.controller');

app.use(bodyParser.urlencoded({ extended: false }));

//middleware
app.use(cors());
app.use(bodyParser.json());


// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', userRoutes);

// global error handler
app.use(errorHandler);

// start server
const port = 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});