var express = require('express');
var router = express.Router();
var bcrypt = require('../bin/password');


/**
 * route: /user/:username
 * type: GET
 * response: username details of the user with requested username
  */
router.get('/:username', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.params.username;
    // get attributes for the username
    db.query('SELECT username, first_name, last_name, email_id, virtual_currency from User where username = ?', username, function (rows) {
        res.send(rows);
    }, function (err) {
        res.send('DB Error: '+ + err);
    });
});


module.exports = router;
