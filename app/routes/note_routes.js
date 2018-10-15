'use strict';

console.log('loaded');

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        // We create a new note here
        console.log(req.body);
        res.send('Note create request accepted');
    });
    app.get('/health', (req, res) => {
        res.send('Johnnie 5 alive!');
    });
};