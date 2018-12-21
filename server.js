'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 8075;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {
    if (err) {
        return console.log(err);
    } else {
        let database = client.db('wardrobe');
        require('./app/routes')(app, database); // Automatically loads the index.js in the specified directory. 
                                                // Which is a module that returns a function using module.exports

        app.listen(port, () => {
            console.log('Server alive on port ' + port);
        });
    }
});