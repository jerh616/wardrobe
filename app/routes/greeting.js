'use strict';

module.exports = {
    hello: function(req, res) {
        if (!req.body.name) {
            res.send('An error occurred: name is a required parameter');
        }
    }
};