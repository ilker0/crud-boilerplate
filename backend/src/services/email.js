class EmailService {
	sendEmail = async data => {
		console.log(data);
	};
}

module.exports = new EmailService();
