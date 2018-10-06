var express = require('express');
var router = express.Router();
var bcrypt = require('../bin/password');
var secret_file = require('../secret');
const jwt = require('jsonwebtoken');

/**
 * route /auth/
 * type: POST
 * req: user and wallet attributes in body
 * res: user and wallet created/registered
 */
router.post('/', function(req, res) {
    // get database connection
    var db = req.connection;
    // get username
    var username = req.body.username;
    // console.log(req.body);
    // check for username in database
    db.query('SELECT username FROM User WHERE username = ?', username, function (rows) {
        if (rows.length !== 0) {
            // username or user exists
            res.send('Auth Error: Username exists!');
        }
        else {
            // password first encrypted using bcrypt library
            bcrypt.cryptPassword(req.body.password, function (hash) {
                // attributes
                var values = {
                    username: username,
                    password: hash,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email_id: req.body.email_id
                };
                // insert user attributes into User table
                db.query('INSERT INTO User SET ?', values, function (rows) {
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
                            res.send('DB success: user and wallet added');
                        }, function (err) {
                            res.send('DB error: ' + err);
                        });

                    }, function (err) {
                        res.send('Encryption error: ' + err);
                    });
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
 * route /auth/login
 * type: POST
 * req: username and password
 * res: user created
 */
router.post('/login', function(req, res) {
    // get database connection
    var db = req.connection;
    // get username
    var username = req.body.username;
    // console.log(req.body);
    // check for username in database
    db.query('SELECT password FROM User WHERE username = ?', username, function (rows) {
        if (rows.length === 0) {
            // username or user exists
            res.send("Auth Error: user doesn't exist");
        }
        else {
            passhash = rows[0].password;
            // password first compared using bcrypt library
            bcrypt.comparePassword(req.body.password, passhash.toString(), function (isMatch) {
               if (isMatch) {
                   // if password match
                   // create a jwt token as a response
                   var token = jwt.sign({userID: username}, secret_file.secret, {expiresIn: '2h'});
                   res.send(token)
               }
               else {
                   res.send("Auth Error: Passwords don't match");
               }
            }, function (err) {
                res.send('Decryption error: ' + err);
            });
        }
    }, function (err) {
        res.send('DB error: ' + err);
    });
});

module.exports = router;