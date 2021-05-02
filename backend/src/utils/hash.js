const bcrypt = require('bcrypt');

const hashPassword = async password => {
	const result = await bcrypt.hash(password, 10);
	return result;
};

const resolvePassword = async (hashPass, textPlainPass) => {
	const result = bcrypt.compare(textPlainPass, hashPass);
	return result;
};

module.exports = {
	hashPassword,
	resolvePassword,
};
