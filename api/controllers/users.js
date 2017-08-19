'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.list_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            return res.errorOut(500, err);

        res.json(
			user.map(
				function(user) {
					return user.toObject();
				}
			)
		);
    });
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            return nes.errorOut(400, err);

        res.json(user.toObject());
    });
};

exports.get_user = function(req, res) {
    User.findOne(
        {
            username: req.params.username
        }, 
        function(err, user) {
            if (err)
                return res.errorOut(500, err);

			if (!user)
				return res.errorOut(404, 'User not found');

            res.json(user.toObject());
        }
    );
};

exports.update_user = function(req, res) {
    User.findOneAndUpdate(
        {
            username: req.params.username
        }, 
        req.body, 
        {
			new: true,
			runSettersOnQuery: true
		}, 
        function(err, user) {
            if (err)
                return res.errorOut(500, err);

			if (!user)
 				return res.errorOut(404, 'User not found');

            res.json(user.toObject());
        }
    );
};

exports.delete_user = function(req, res) {
    User.remove(
        {
            username: req.params.username
        }, 
        function(err, user) {
            if (err)
                return res.errorOut(500, err);

			if (!user)
				return res.errorOut(404, 'User not found');

			res.status(204).end();
        }
    );
};
