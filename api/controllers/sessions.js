'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('Users'),
    jwt_tools = require('jwt-tools');

exports.create_session = function(req, res) {
	if (typeof req.body.username !== 'string')
		return res.sendOut(400, 'No username provided');
	
	if (typeof req.body.password !== 'string')
		return res.sendOut(400, 'No password provided');
	
	User.findOne(
		{
			username: req.body.username
		},
		function(err, user) {
			if (err)
				return res.errorOut(401, 'Username and password do not match');

			if (!user)
				return res.errorOut(401, 'User not found');

			user.comparePassword(req.body.password, function(err, match) {
				if (err)
					return res.errorOut(401, err);

				if (!match)
					return res.errorOut(401, 'Username and password do not match');

				var url = 'https://api.jakew.ca';
				var auth = url + '/authentication/v1';
				var iss = auth + '/sessions';
				var sub = auth + '/users/' + user.username;
				var aud = [
					auth,
					url + '/blog',
					url + '/resume'
				];
				
				try {
					var token = jwt_tools.create_jwt(iss, sub, aud);
				} catch(err) {
					return res.errorOut(500, err);
				}

				if (!token)
					return res.errorOut(500, 'Unable to generate token');

				res.json(
					{
						token: token
					}
				);
			});
		}
    );
};
