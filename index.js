const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const path = require('path')


mongoose.connect('mongodb://127.0.0.1:27017/Quiz')
    .then(() => {
        console.log('Connected to MongoDB..')
        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Listening on port ${port}..`));
    })
    .catch(err => console.error('Could not connect to MongoDB...', err.message))


const app = express('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const user= require('./router/user');
app.use('/api', user);



const admin = require("./router/Admin");
app.use ('/admin',admin)

