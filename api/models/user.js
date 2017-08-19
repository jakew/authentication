'use strict';

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema(
	{
		username: {
			type: String,
			required: 'Please enter a username for the user',
			unique: true
		},
		name: {
			type: String,
			required: 'Please enter the name of the user',
			unique: true
		},
		password: {
			type: String,
			required: 'Please enter a password for the user',
			set: function(password) {
				var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
				return bcrypt.hashSync(password, salt);
			}
		},
		created_date: {
			type: Date,
			default: Date.now
		}
	},
	{
		toObject: {
			transform: function (doc, ret) {
				delete ret._id;
				delete ret.__v;
			}
		},
	}
);

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) 
			return cb(err);
		cb(null, isMatch);
	});
}

module.exports = mongoose.model('Users', UserSchema);
