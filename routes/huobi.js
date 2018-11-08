var express = require('express');
var router = express.Router();

const https = require('https');
const cors = require('cors');
const api_url = 'https://api.huobi.pro/market/tickers';

/* GET users listing. */
router.get('/:token', cors(), function(req, res) {
    let token = req.params.token;
    if (token) {
        https.get(api_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                res.status(200).send({ price: JSON.parse(data).data.filter((item) => item.symbol == token)[0].close });
            });
        }).on('error', (err) => {
            res.status(500).send({ message: 'api call failed with error: ' + JSON.stringify(err) });
        });
    } else {
        res.status(400).send({ message: 'invalid token supplied' });
    }
});

module.exports = router;
