'use strict';

var ObjectID = require('mongodb').ObjectID;
const NOTES = 'notes';

module.exports = function(app, myDB) {

    app.post('/notes', (req, res) => {
        // We create a new note here
        const note = { text: req.body.body, title: req.body.title};
        myDB.collection(NOTES).insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'A DB error has occurred'});
                myDB.close();
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
        myDB.collection(NOTES).findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'A DB read error has occurred'});
                myDB.close();
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)};
        myDB.collection(NOTES).remove(details, (err, item) => {
            if (err) {
                res.send({'error':'A remove error occurred on DB operation'});
                myDB.close();
            } else {
                res.send('Note ' + id + ' sucessfully deleted');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id)};
        const newNote = { text: req.body.body, title: req.body.title};

        myDB.collection(NOTES).updateOne(details, newNote, (err, item) => {
            if (err) {
                res.send({'error':'Error occurred trying to update ' + id});
                myDB.close();
            } else {
                res.send('Note ' + id + ' successfully updated');
            }
        });
    });

    // Extensions

    app.get('/notes', (req, res) => {
        let cursor = myDB.collection(NOTES).find();
        let dox = [];

        cursor.each( (err, item) => {
            if (err) {
                res.send({'error':'Error occurred when attempting to read from collection: ' + NOTES});
                myDB.close();
            } else if (item) { // Build up items for the response
                dox.push(item);              
            } else { // There are no items left so send response
                res.send(dox);
            }
        });
    });
};