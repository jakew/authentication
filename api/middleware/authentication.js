'use strict';

var jwt_tools = require('jwt-tools');

module.exports = function(req, res, next) {
    var token = req.get('Authorization');
    var issuer = 'https://api.jakew.ca/authentication/sessions';
    jwt_tools.verify(token, issuer, function (err, decoded){
        if (err)
            return res.errorOut(401, err);
        
        next();
    });
}
