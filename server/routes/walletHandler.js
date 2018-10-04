var express = require('express');
var router = express.Router();
var bcrypt = require('../bin/password');


/**
 * route /wallet/
 * type: GET
 * req: wallet attributes in body
 * res: wallet created
 */
router.post('/', function(req, res) {
    // get database connection
    var db = req.connection;
    // get username
    var username = req.body.owner_username;
    // console.log(req.body);
    // check for username in database
    db.query('SELECT username FROM User WHERE username = ?', username, function (rows) {
        if (rows.length === 0) {
            // user doesn't exist
            res.send("DB Error: Username doesn't exist!");
        }
        else {
            // username hash for wallet id
            bcrypt.cryptPassword(username, function (hash) {
                // attributes
                var values = {
                    owner_username: username,
                    wallet_id: hash,
                    bitcoin: req.body.bitcoin,
                    ether: req.body.ether
                };
                // insert user attributes into User table
                db.query('INSERT INTO Wallet SET ?', values, function (rows) {
                    res.send('DB success: wallet added');
                }, function (err) {
                    res.send('DB error: ' + err);
                });

            }, function (err) {
                res.send('Encryption error: ' + err);
            });
        }
    }, function (err) {
        res.send('DB error: ' + err);
    });
});


/**
 * route: /wallet/:username
 * type: GET
 * response: wallet details for a particular user
 */
router.get('/:username', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.params.username;
    db.query('SELECT owner_username, bitcoin, ether from Wallet where owner_username = ?', username, function (rows) {
        res.send(rows);
    }, function (err) {
        res.send('DB Error: '+ + err);
    });
});


module.exports = router;
