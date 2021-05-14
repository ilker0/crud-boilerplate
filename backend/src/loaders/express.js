const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config');
const routes = require('../api');
const upload = require('express-fileupload');
const express = require('express');

module.exports = ({ app }) => {
	app.enable('trust proxy');
	app.use(upload());
	app.use('/uploads', express.static('uploads'));
	app.use(cors());
	app.use(require('method-override')());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(config.api.prefix, routes());
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				statusCode: err.status ? err.status : '500',
				message: err.message,
			},
		});
	});
};
