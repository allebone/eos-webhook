const secret = "Rk5-vqMMVL";
const repo1 = "/home/beskar/eos-prototype-users/";
const repo2 = "/home/beskar/eos-auth-test/";

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo1 + ' && git pull');
            exec('cd ' + repo2 + ' && git pull');
        }
    });

    res.end();
}).listen(8080);
