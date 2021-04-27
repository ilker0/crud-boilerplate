const Consumer = require('./consumer');
const EmailService = require('../../services/email');

module.exports = () => {
	const consumer = new Consumer();
	consumer.setConsumer('hello', EmailService.sendEmail);
};
