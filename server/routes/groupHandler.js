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
    db.query('SELECT * from User_group where group_name = ?', req.body.group_name, function (rows) {
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
                // values to insert into user_group table
                var values = {
                    group_name: req.body.group_name,
                    admin_username: req.user.userID
                };
                db.query('Insert into User_group Set ?', values, function (rows) {
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
                'User_group as g ' +
                'on p.group_name = g.group_name', username, function (rows) {
        res.send(rows);
    }, function (err) {
        res.send('DB Error: ' + err);
    });
});


module.exports = router;
