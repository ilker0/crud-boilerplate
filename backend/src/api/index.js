const { Router } = require('express');
const user = require('./routes/user');
const product = require('./routes/product');
const category = require('./routes/category');
const gallery = require('./routes/gallery');

module.exports = () => {
	const app = Router();
	user(app);
	product(app);
	category(app);
	gallery(app);

	return app;
};
