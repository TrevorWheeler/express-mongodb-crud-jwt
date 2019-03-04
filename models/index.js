require('dotenv').load();
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/api', {
	keepAlive: true,
	useNewUrlParser: true,
	useCreateIndex: true
});

module.exports.User = require('./user');
module.exports.Projects = require('./projects');
