'use strict';

var express = require('express'),
	sessions = require('../controllers/sessions');

var router = express.Router()

router
    .post('/', sessions.create_session);

module.exports = router;
