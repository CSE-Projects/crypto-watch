var express = require('express');
var router = express.Router();
var bcrypt = require('../bin/password');
// Add new user
router.post('/', function(req, res) {
    // get database connection
    var db = req.connection;
    // get username
    var username = req.body.username;
    // console.log(req.body);
    // check for username in database
    db.query('SELECT username FROM User WHERE username = ?', username,
        function (rows) {
            if (rows.length !== 0) {
                // username or user exists
                res.send('DB Error: Username exists!');
            }
            else {
                // password first encrypted using bcrypt library
                bcrypt.cryptPassword(req.body.password,
                    function (hash) {
                        // attributes
                        var values = {
                            username: username,
                            password: hash,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email_id: req.body.email_id
                        };
                        // insert user attributes into User table
                        db.query('INSERT INTO User SET ?', values,
                            function (rows) {
                                res.send('DB success: user added');
                            },  function (err) {
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



module.exports = router;
