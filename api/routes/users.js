'use strict';

var express = require('express'),
	authentication = require ('../middleware/authentication.js'),
	users = require('../controllers/users');

var router = express.Router()

router
	.get('/', users.list_users)
    .post('/', authentication, users.create_user)
    .get('/:username', users.get_user)
    .put('/:username', authentication, users.update_user)
    .delete('/:username', authentication, users.delete_user);

module.exports = router;
