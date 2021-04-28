const nodemailer = require('nodemailer');
const fs = require('fs'),
	path = require('path'),
	handlebars = require('handlebars');
const config = require('../config');

class EmailService {
	sendEmail = async data => {
		data = JSON.parse(data);
		const source = fs.readFileSync(
			path.join(__dirname + '/../templates/email/', `${data.emailTemplateName}.hbs`),
			'utf8',
		);
		const template = handlebars.compile(source);

		let transport = nodemailer.createTransport({
			host: config.email.host,
			port: config.email.port,
			auth: {
				user: config.email.user,
				pass: config.email.password,
			},
		});

		const message = {
			from: {
				address: config.email.from,
			},
			to: data.to,
			subject: data.subject,
			html: template(data.emailTemplateData),
		};

		transport.sendMail(message, function (err, info) {
			if (err) {
				console.log(err);
			} else {
				return;
			}
		});
	};
}

module.exports = new EmailService();
