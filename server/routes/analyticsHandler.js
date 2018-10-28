var express = require('express');
var router = express.Router();

/**
 * route: /analytics
 * type: GET
 * req: username from token
 * response: transactions
 */
router.get('/', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    // get groups and their details for this username
    db.query('select payment_to, payment_from, value, time ' +
            'from Group_Transactions ' +
            'where payment_to = ? or ' +
            'payment_from = ? and ' +
            'resolved = 0' , [username, username], function (rows) {
        res.send(rows);
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});

module.exports = router;
