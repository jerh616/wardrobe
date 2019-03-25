'use strict';

const expect = require('chai').expect;
const hello = require('../../app/routes/greeting');

let req = {
    body: {}
};

let res = {
    sendCalledWith: '',
    send: function(arg) {
        this.sendCalledWith = arg;
    }
};

describe('Greetings Route', function() {
    describe('Hello() function', function() {
        it('Should respond with error if no name provided in body', function() {
            hello(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });
    });
});
