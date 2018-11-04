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
        res.send('DB Error: '+ err);
    });
});

/**
 * route: /user/transactions
 * type: GET
 * response: all personal transactions made to a user
 */
router.get('/transactions/all', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    // Transactions
    db.query('select * from transactions where payment_to = ? or payment_from = ?', [username, username], function (rows) {
        console.log(rows.length);
        res.send(rows)
    }, function (err) {
        res.send('DB Error: '+  err);
    });
});


/**
 * route: /user/transactions
 * type: POST
 * request: transaction fields in body
 * response: New personal transaction added
 */
router.post('/transactions', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    console.log(req.body);
    // check whether from and to fields in the transaction are valid
    db.query('Select count(*) as count from User where username in (?)', [[req.body.payment_from, req.body.payment_to]], function (rows) {
        if(rows[0].count !== 2) {
            console.log(rows);
            res.send('Error: Invalid from and to fields in the transaction');
            return;
        }
        // console.log(rows);
        var values = {
            payment_to: req.body.payment_to,
            payment_from: req.body.payment_from,
            time: req.body.time,
            value: req.body.value
        };
        // get transaction details for that group name
        db.query('Insert into Transactions SET ?', values, function (rows) {
            res.send('Transaction added');
        }, function (err) {
            res.send('DB Error: ' + err);
        });
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});

module.exports = router;
