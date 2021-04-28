const config = require('../config');
const logger = require('./logger');
const amqplib = require('amqplib');

// Callbacks
const emailService = require('../services/email');

class RabbitMQ {
	constructor() {
		this.connection = null;
		this.channel = null;
		this.queues = ['email'];
		this.consumers = [
			{
				queue: 'email',
				callback: emailService.sendEmail,
			},
		];

		this.init();
	}

	async init() {
		try {
			const connection = await amqplib.connect(config.rabbitMQUrl);
			const channel = await connection.createChannel();

			this.connection = connection;
			this.channel = channel;

			await this.initQueues();
			await this.initConsumers();

			logger.info(`✅ Rabbit MQ connected`);
		} catch (err) {
			logger.error(`❌ Rabbit MQ connection error -> ${err}`);
		}
	}

	initQueues() {
		try {
			this.queues.forEach(item => {
				this.channel.assertQueue(item, {
					durable: false,
				});
			});
		} catch (err) {
			logger.error(`❌ Rabbit MQ queue error -> ${err}`);
		}
	}

	initConsumers() {
		this.consumers.forEach(item => {
			try {
				this.channel.consume(
					item.queue,
					function (msg) {
						item.callback(msg.content.toString());
					},
					{
						noAck: true,
					},
				);
			} catch (err) {
				logger.error(`❌ Rabbit MQ consumer error -> ${err}`);
			}
		});
	}

	publish(queue, msg) {
		try {
			this.channel.assertQueue(queue, {
				durable: false,
			});

			this.channel.sendToQueue(queue, Buffer.from(msg));
		} catch (err) {
			logger.error(`❌ Rabbit MQ publisher error -> ${err}`);
		}
	}
}

module.exports = new RabbitMQ();
