var mysql = require('mysql');

// connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'crypto_watch',
    password: 'crypto_watch123'
});

// connect to database and create default tables if they don't exist
exports.connectDB = function (callback, fallback) {
    // connect to the database
    connection.connect(function(err) {
        if (err) return fallback(err);
        // console.log('connected as id ' + connection.threadId);
        // Database CryptoWatch
        connection.query('CREATE DATABASE IF NOT EXISTS CryptoWatch', function (err) {
            if (err) return fallback(error);
            connection.query('USE CryptoWatch', function (err) {
                if (err) return fallback(error);
                // User table
                connection.query('CREATE TABLE IF NOT EXISTS User('
                    + 'username VARCHAR(10) PRIMARY KEY,'
                    + 'password BINARY(60) NOT NULL,'
                    + 'first_name VARCHAR(20) NOT NULL,'
                    + 'last_name VARCHAR(20),'
                    + 'email_id VARCHAR(50) NOT NULL,'
                    + 'virtual_currency BIGINT(10) DEFAULT 500000'
                    +  ')', function (err) {
                    if (err) return fallback(err);
                });
                // Wallet table
                connection.query('CREATE TABLE IF NOT EXISTS Wallet ('
                    + 'owner_username VARCHAR(10),'
                    + 'wallet_id BINARY(60) PRIMARY KEY,'
                    + 'bitcoin BIGINT(10) DEFAULT 0,'
                    + 'ether BIGINT(10) DEFAULT 0,'
                    + 'CONSTRAINT fk_wallet FOREIGN KEY (owner_username) REFERENCES User(username) ON DELETE CASCADE'
                    +  ')', function (err) {
                    if (err) return fallback(err);
                });
                // Group table
                connection.query('CREATE TABLE IF NOT EXISTS User_Group ('
                    + 'group_name VARCHAR(10) PRIMARY KEY,'
                    + 'admin_username VARCHAR(10),'
                    + 'CONSTRAINT fk_group FOREIGN KEY (admin_username) REFERENCES User(username)'
                    +  ')', function (err) {
                    if (err) return fallback(err);
                });
                // Part_of table
                connection.query('CREATE TABLE IF NOT EXISTS Part_of ('
                    + 'group_name VARCHAR(10),'
                    + 'username VARCHAR(10),'
                    + 'CONSTRAINT fk_group_partof FOREIGN KEY (group_name) REFERENCES User_Group(group_name) ON DELETE CASCADE,'
                    + 'CONSTRAINT fk_username_partof FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE'
                    +  ')', function (err) {
                    if (err) return fallback(err);
                });
                // Group transaction table
                connection.query('CREATE TABLE IF NOT EXISTS Group_Transactions ('
                    + 'group_name VARCHAR(10),'
                    + 'payment_to VARCHAR(10),'
                    + 'payment_from VARCHAR(10),'
                    + 'value BIGINT(20) NOT NULL,'
                    + 'time DATE NOT NULL,'
                    + 'resolved INT(1) DEFAULT 0,'
                    + 'CONSTRAINT fk_group_transact FOREIGN KEY (group_name) REFERENCES User_Group(group_name),'
                    + 'CONSTRAINT fk_to_group FOREIGN KEY (payment_to) REFERENCES User(username),'
                    + 'CONSTRAINT fk_from_group FOREIGN KEY (payment_from) REFERENCES User(username)'
                    +  ')', function (err) {
                    if (err) return fallback(err);
                });
                // Group transaction table
                connection.query('CREATE TABLE IF NOT EXISTS Transactions ('
                    + 'payment_to VARCHAR(10),'
                    + 'payment_from VARCHAR(10),'
                    + 'value BIGINT(20) NOT NULL,'
                    + 'time DATE NOT NULL,'
                    + 'CONSTRAINT fk_to_user FOREIGN KEY (payment_to) REFERENCES User(username),'
                    + 'CONSTRAINT fk_from_user FOREIGN KEY (payment_from) REFERENCES User(username)'
                    +  ')', function (err) {
                    if (err) return fallback(err);
                });
            });

        });
        return callback(connection.threadId);
    });
};

// query the database
exports.query = function(query_string, params, callback, fallback) {
    connection.query(query_string, params, function (error, results) {
        if (error) return fallback(error);
        // connected!
        // console.log(results);
        return callback(results);
    });
};

