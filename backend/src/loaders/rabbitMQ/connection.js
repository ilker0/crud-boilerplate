const config = require('../../config');
const logger = require('../logger');
const amqplib = require('amqplib');

class RabbitMQBase {
	constructor() {
		this.connection = null;
		this.channel = null;

		this.init();
	}

	async init() {
		try {
			const connection = await amqplib.connect(config.rabbitMQUrl);
			const channel = await connection.createChannel();

			this.connection = connection;
			this.channel = channel;

			logger.info(`✅ Rabbit MQ connected`);
		} catch (err) {
			logger.error(`❌ Rabbit MQ connection error -> ${err}`);
		}
	}

	getConnection() {
		return this.connection;
	}
}

module.exports = new RabbitMQBase();
