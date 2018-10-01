var mysql = require('mysql');

// connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'crypto_watch',
    password: 'crypto_watch123',
    database: 'crypto_watch'
});

var connectDB = function () {
    // connect to the database
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
};

var query = function(query_string) {
    connection.query(query_string, function (error, results, fields) {
        if (error) throw error;
        // connected!
        console.log(results);
    });
};

exports.connectDB = connectDB;
exports.query = query;
