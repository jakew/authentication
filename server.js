var express = require('express'),
    app = express(),
    port = process.env.PORT || 80,
    mongoose = require('mongoose'),
    User = require('./api/models/user'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Users',  {
  useMongoClient: true,
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.errorOut = function(statusCode, message) {
        return res.status(statusCode).json({"message": message}).end();
    };
    next();
});

var usersRoutes = require('./api/routes/users')
    sessionsRoutes = require('./api/routes/sessions');

var router = express.Router();
router.use('/users', usersRoutes);
router.use('/sessions', sessionsRoutes);

app.use('/authentication/v1', router);
app.listen(port);

console.log('Authentication server started on: ' + port);
