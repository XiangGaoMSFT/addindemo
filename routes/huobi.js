var express = require('express');
var router = express.Router();

const https = require('https');
const cors = require('cors');
const api_url = 'https://api.huobi.pro/market/tickers';

/* GET users listing. */
router.get('/:token', cors(), function(req, res) {
    var token = req.params.token;
    if (token) {
        https.get(api_url, function(resp) {
            var data = '';
            resp.on('data', function(chunk) {
                data += chunk;
            });

            resp.on('end', function () {
                res.status(200).send({ price: JSON.parse(data).data.filter(function (item) { return item.symbol == token})[0].close });
            });
        }).on('error', function (err) {
            res.status(500).send({ message: 'api call failed with error: ' + JSON.stringify(err) });
        });
    } else {
        res.status(400).send({ message: 'invalid token supplied' });
    }
});

module.exports = router;
