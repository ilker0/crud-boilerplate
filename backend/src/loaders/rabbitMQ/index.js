const Consumers = require('./consumers');
const EmailService = require('../../services/email');

module.exports = () => {
	const consumer = new Consumers();
	consumer.setConsumer('hello', EmailService.sendEmail);
};
