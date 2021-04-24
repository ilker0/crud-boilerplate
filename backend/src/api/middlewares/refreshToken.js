const jwt = require('jsonwebtoken');
const { jwtRefreshSecret } = require('../../config');
const httpStatusCodes = require('../../utils/httpStatusCodes');

module.exports = (req, res, next) => {
	const token = req.body['refresh_token'];

	if (token) {
		jwt.verify(token, jwtRefreshSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({ message: httpStatusCodes[401] });
			} else {
				req.body = {
					...decoded,
					token,
				};
				next();
			}
		});
	} else {
		res.status(401).json({ message: httpStatusCodes[401] });
	}
};
