var express = require('express');
var router = express.Router();
var cache = require('memory-cache');

const https = require('https');
const cors = require('cors');
const uuid = require('uuid/v4');

if (!cache.get('forms.listeners')) {
    cache.put('forms.listeners', {});
}

var listeners = cache.get('forms.listeners');

router.get('/', function(req, res) {
    res.render('forms');
});

router.delete('/listener/:id', cors(), function(req, res) {
    var id = req.params.id;
    delete listeners.id;
    res.status(200).send();
});

router.post('/listener/:id/responses', cors(), function(req, res) {
    var response = req.body.response;
    var id = req.params.id;

    console.log('new response for ' + id + ': ' + JSON.stringify(response));

    var listener = listeners[id];
    if (listener && listener.socket && listener.socket.connected) {
        listener.socket.emit('forms.newResponse', { response: response });
    } else {
        if (!listener) {
            console.error('listener for ' + id + ' does not exist');
            res.status(500).send({ message: 'listener for ' + id + ' does not exist' });
        } else if (!lisener.socket) {
            console.error('socket for ' + id + ' does not exist');
            res.status(500).send({ message: 'socket for ' + id + ' does not exist' });
        } else {
            console.error('connection for ' + id + ' is closed');
            res.status(500).send({ message: 'connection for ' + id + ' is closed' });
        }
    }

    res.status(200).send();

    // TODO: remove listener automatically
});

router.onSocketIoLoaded = function(io) {
    io.on('connection', function(socket) {
        socket.on('forms.newListener', function(id) {
            if (!id) {
                id = uuid();
            }

            listeners[id] = {
                socket: socket
            };

            socket.emit('forms.newListenerId', { id: id });
        })
    })
}

module.exports = router;
