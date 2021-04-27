const ConnectionBase = require('./connection');
const logger = require('../logger');

class Consumers {
	constructor() {
		this.connection = ConnectionBase.connection;
		this.channel = ConnectionBase.channel;
	}

	setConsumer(queue, callback) {
		try {
			this.channel.consume(
				queue,
				function (msg) {
					callback(msg.content.toString());
				},
				{
					noAck: true,
				},
			);
		} catch (err) {
			logger.error(`❌ Rabbit MQ consumer error -> ${err}`);
		}
	}
}

module.exports = Consumers;
