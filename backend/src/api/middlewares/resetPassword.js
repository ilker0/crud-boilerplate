const jwt = require('jsonwebtoken');
const { jwtResetPassSecret } = require('../../config');
const { invalid } = require('../../utils/errors');
const { resetPasswordTokenMatch } = require('../../services/user');

module.exports = (req, res, next) => {
	const token = req.body['resetpass_token'];

	if (token) {
		jwt.verify(token, jwtResetPassSecret, async (err, decoded) => {
			if (err) {
				res.status(400).json({ name: 'RequestError', message: invalid('TOKEN') });
			} else {
				const tokenMatchResult = await resetPasswordTokenMatch(token, decoded.email);
				if (!tokenMatchResult) {
					res.status(400).json({ name: 'RequestError', message: invalid('TOKEN') });
				} else {
					req.body = {
						...decoded,
						...req.body,
					};
					next();
				}
			}
		});
	} else {
		res.status(400).json({ name: 'RequestError', message: invalid('TOKEN') });
	}
};
