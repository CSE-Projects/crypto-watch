var express = require('express');
var router = express.Router();
var bcrypt = require('../bin/password');


/**
 * route: /wallet/
 * type: POST
 * response: wallet details for a particular user
 */
router.get('/', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    db.query('SELECT owner_username, bitcoin, ether from Wallet where owner_username = ?', username, function (rows) {
        res.send(rows);
    }, function (err) {
        res.send('DB Error: '+ + err);
    });
});

module.exports = router;
