'use strict';

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, myDB) {

    app.post('/notes', (req, res) => {
        // We create a new note here
        const note = { text: req.body.body, title: req.body.title};
        myDB.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'A DB error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/health', (req, res) => {
        res.send('Johnnie 5 alive!');
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'A DB read error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)};
        myDB.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'A remove error occurred on DB operation'});
            } else {
                res.send('Note ' + id + ' sucessfully deleted');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id)};
        const newNote = { text: req.body.body, title: req.body.title};

        myDB.collection('notes').updateOne(details, newNote, (err, item) => {
            if (err) {
                res.send({'error':'Error occurred trying to update ' + id});
            } else {
                res.send('Note ' + id + ' successfully updated');
            }
        });
    });
};