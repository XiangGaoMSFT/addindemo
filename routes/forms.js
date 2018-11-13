var express = require('express');
var router = express.Router();

const https = require('https');
const cors = require('cors');
const uuid = require('uuid/v4');

var listeners = {};

router.get('/', function(req, res) {
  res.render('forms');
});

router.delete('/listener/:id', cors(), function(req, res) {
    var id = req.params.id;
    delete listeners.id;
});

router.post('/listener/:id/responses', cors(), function(req, res) {
    var response = req.body;
    var id = req.params.id;

    console.log('new response for ' + id + ': ' + JSON.stringify(response));

    var listener = listeners[id];
    if (listener && listener.socket) {
        listener.socket.emit('forms.newResponse', { response: response });
    } else {
        if (!listener) {
            console.error('listener for ' + id + ' does not exist');
        } else {
            console.error('socket for ' + id + ' does not exist');
        }
    }
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
