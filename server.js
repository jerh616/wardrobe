'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbInfo = require('./config/db');

const app = express();
const port = 8075;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(dbInfo.url, (err, database) => {
    if (err) {
        return console.log(err)
    } else {
        require('./app/routes')(app, {});

        app.listen(port, () => {
            console.log('Server alive on port ' + port);
        });
    }
});