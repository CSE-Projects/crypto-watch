var express = require('express');
var router = express.Router();

/**
 * route: /group
 * type: POST
 * req: group_name and list of usernames, in body and admin_username extracted from token (the user who creates the group is the admin)
 * response: successfully created a group
 */
router.post('/', function (req, res) {
    // get db connection
    var db = req.connection;

    // check if group_name exists
    db.query('SELECT * from User_Group where group_name = ?', req.body.group_name, function (rows) {
        if (rows.length !== 0) {
            res.send('Error: Group Name exists');
        }
        else {
            // list of usernames
            var username_list = req.body.username_list;

            // check if all users in the list exist
            db.query('select count(*) as count from User where username in (?)', [username_list], function (rows) {
                // console.log(rows[0].count);
                // some users don't exist
                if (rows[0].count !== username_list.length) {
                    res.send("Error: Some Users don't exist");
                    return;
                }

                // create a group entry in the table
                // with value of group_name and admin_name
                // values to insert into User_Group table
                var values = {
                    group_name: req.body.group_name,
                    admin_username: req.user.userID
                };
                db.query('Insert into User_Group Set ?', values, function (rows) {
                    // form tuples to be inserted into the table part_of
                    var values = [];
                    values.push([req.body.group_name, req.user.userID]);
                    for (var i = 0; i < username_list.length; ++i) {
                        values.push([req.body.group_name, username_list[i]]);
                    }
                    console.log(values);

                    // add user to group using Part_of table
                    db.query('Insert into Part_of Values ?', [values], function (rows) {
                        res.send('Group created and Users added to the group');
                    }, function (err) {
                        res.send('DB Error: ' + err);
                    });
                }, function (err) {
                    res.send('DB Error: ' + err);
                });
            }, function (err) {
                console.log(err);
            });
        }
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});


/**
 * route: /group
 * type: GET
 * req: username from token
 * response: all groups the user is part of
 */
router.get('/', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    // get groups and their details for this username
    db.query('Select g.group_name, g.admin_username ' +
            'from (Select * from Part_of where username = ?) as p ' +
                'INNER JOIN ' +
                'User_Group as g ' +
                'on p.group_name = g.group_name', username, function (rows) {
        res.send(rows);
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});

/**
 * route: /group/:group_name
 * type: GET
 * req: group_name as param
 * response: all users in the group
 */
router.get('/:group_name', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    // check if the user is part of the group
    db.query('Select * from Part_of where username = ?', username, function (rows) {
        if (rows.length === 0) {
            res.send('Error: User is not part of the group');
        }
        // get usernames for the users in the group
        db.query('Select username from Part_of where group_name = ?', req.params.group_name, function (rows) {
            res.send(rows)
        }, function (err) {
            res.send('DB Error: ' + err);
        });
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});


/**
 * route: /group/transactions/:group_name
 * type: GET
 * req: username from token, group_name in param
 * res: all transaction done in a group
 */
router.get('/transactions/:group_name', function(req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    var group_name = req.params.group_name;
    // check if user is a part of a group
    db.query('Select * from Part_of where username = ? and group_name = ?', [username, group_name], function (rows) {
        if (rows.length === 0) {
            res.send('Error: User not present in the Group');
        }
        else {
            // get transaction details for that group name
            db.query('Select * from Group_Transactions where group_name = ? and resolved = 0', group_name, function (rows) {
                res.send(rows);
            }, function (err) {
                res.send('DB Error: ' + err);
            });
        }
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});


/**
 * route: /group/transactions
 * type: POST
 * req: group_name and transaction details in the body
 */
router.post('/transactions', function (req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    var group_name = req.body.group_name;
    // check if user is a part of a group
    db.query('Select * from Part_of where username = ? and group_name = ?', [username, group_name], function (rows) {
        if (rows.length === 0) {
            res.send('Error: User not present in the Group');
        }
        else {
            // check whether from and to fields in the transaction are part of the group
            db.query('Select * from Part_of where group_name = ? and username in (?)', [group_name, [req.body.payment_from, req.body.payment_to]], function (rows) {
                if(rows.length !== 2) {
                    res.send('Error: Invalid from and to fields in the transaction');
                    return;
                }
                // console.log(rows);
                var values = {
                    group_name: group_name,
                    payment_to: req.body.payment_to,
                    payment_from: req.body.payment_from,
                    time: req.body.time,
                    value: req.body.value
                };
                // get transaction details for that group name
                db.query('Insert into Group_Transactions SET ?', values, function (rows) {
                    res.send('Transaction added');
                }, function (err) {
                    res.send('DB Error: ' + err);
                });
            }, function (err) {
                res.send('DB Error: ' + err);
            });
        }
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});



/**
 * route: /group/transactions/resolve/:group_name
 * type: GET
 * req: group_name in param, admin as a user
 * res: all transaction done in a group
 */
router.get('/transactions/resolve/:group_name', function(req, res) {
    // get db connection
    var db = req.connection;
    var username = req.user.userID;
    var group_name = req.params.group_name;
    // check user is the admin for the group
    db.query('Select * from User_Group where admin_username = ? and group_name = ?', [username, group_name], function (rows) {
        if (rows.length === 0) {
            res.send('Error: User is not the Group Admin');
        }
        else {
            // get all transaction with resolve id 0
            db.query('Select * from Group_Transactions where group_name = ? and resolved = 0', group_name, function (rows) {
                var result = resolveTransactions(rows);
                // console.log(rows);
                console.log(result);
                // db.query('Update Group_Transactions set resolved = 1' , null, function (rows) {
                //     res.send(result);
                // }, function (err) {
                //     res.send('DB Error: ' + err);
                // });
                res.send('ds');
            }, function (err) {
                res.send('DB Error: ' + err);
            });
        }
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});

// core login to resolve transaction
function resolveTransactions(transaction) {
    // result
    var result = [];


    // create list of users present in the transaction
    var users = [];
    for (var i = 0; i < transaction.length; i++) {
        console.log(transaction[i].payment_from);
        var exists = 0;
        for (var j = 0; j < users.length; j++) {
            if (users[j] == transaction[i].payment_from) {
                exists = 1;
                break;
            }
        }
        if (exists == 0) {
            users.push(transaction[i].payment_from);
        }
        exists = 0;
        for (j = 0; j < users.length; j++) {
            if (users[j] == transaction[i].payment_to) {
                exists = 1;
                break;
            }
        }
        if (exists == 0) {
            users.push(transaction[i].payment_to);
        }
    }
    console.log(users);
    // value array for each user
    var values = [];
    for (i = 0; i < users.length; i++) {
        values.push(0);
    }

    // for each transaction
    for (i = 0; i < transaction.length; i++) {
        // from
        values[users.indexOf(transaction[i].payment_from)] -= transaction[i].value;
        // tp
        values[users.indexOf(transaction[i].payment_to)] += transaction[i].value;
    }
    console.log(values);

    for (i = 0; i < values.length; i++) {
        if (values[i] <= 0) continue;

        for (j = 0; j < values.length; j++) {
            if (values[j] < 0) {
                var payment = -1 * values[j];
                if (payment >= values[i]) {
                    transaction = {
                        from: users[i],
                        to: users[j],
                        value: values[i]
                    };
                    values[j] += values[i];
                    values[i] = 0;
                    result.push(transaction);
                    break;
                }
                else {
                    transaction = {
                        from: users[i],
                        to: users[j],
                        value: payment
                    };
                    values[i] -= payment;
                    values[j] = 0;
                    result.push(transaction);
                }
            }
        }
    }

    return result;
}


module.exports = router;
