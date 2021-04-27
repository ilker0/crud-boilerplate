const ConnectionBase = require('./connection');
const logger = require('../logger');

class Publisher {
	constructor() {
		this.connection = ConnectionBase.connection;
		this.channel = ConnectionBase.channel;
	}

	sendQueue() {
		var queue = 'hello';
		var msg = 'Hello world';

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

module.exports = Publisher;
