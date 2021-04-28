const jwt = require('jsonwebtoken');
const { jwtResetPassSecret } = require('../../config');
const httpStatusCodes = require('../../utils/httpStatusCodes');

module.exports = (req, res, next) => {
	const token = req.body['resetpass_token'];

	if (token) {
		jwt.verify(token, jwtResetPassSecret, (err, decoded) => {
			if (err) {
				res.status(400).json({ message: httpStatusCodes[400] });
			} else {
				req.body = {
					...decoded,
					token,
				};
				next();
			}
		});
	} else {
		res.status(400).json({ message: httpStatusCodes[400] });
	}
};
