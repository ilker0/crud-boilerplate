const path = require('path');
const errorHandler = require('./errorHandler');

function fileUpload(file, fileName) {
	try {
		const filePath = path.join(__dirname, '../../uploads/' + fileName);
		file.mv(filePath);
	} catch (error) {
		throw errorHandler(erro);
	}
}

module.exports = { fileUpload };
