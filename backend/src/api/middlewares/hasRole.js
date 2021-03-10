const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const httpStatusCodes = require('../../utils/httpStatusCodes');

function hasRole(hasPermissions) {
	return function (req, res, next) {
		let status = false;
		const {
			role: { permissions },
		} = req.user;

		hasPermissions.forEach(item => {
			if (permissions.indexOf(item) !== -1) {
				status = true;
			}
		});

		if (status) {
			next();
		} else {
			res.status(401).json({ message: httpStatusCodes[401] });
		}
	};
}

module.exports = hasRole;
