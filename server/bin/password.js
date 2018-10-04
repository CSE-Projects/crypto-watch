var bcrypt = require('bcrypt');

// encrypt password
exports.cryptPassword = function(password, callback, fallback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err)
            return fallback(err);

        bcrypt.hash(password, salt, function(err, hash) {
            if (err)
                return fallback(err);
            return callback(hash);
        });
    });
};

// compare passwords
exports.comparePassword = function(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};