const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
	port: parseInt(process.env.PORT, 10),

	databaseURL: process.env.MONGODB_URI,

	jwtSecret: process.env.JWT_SECRET,
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
	jwtExpire: process.env.JWT_EXPIRE,
	jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE,

	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},

	api: {
		prefix: '/api',
	},

	emails: {
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	},
	typeOrm: {
		type: process.env.TYPEORM_TYPE,
		host: process.env.TYPEORM_HOST,
		port: process.env.TYPEORM_PORT,
		username: process.env.TYPEORM_USERNAME,
		password: process.env.TYPEORM_PASSWORD,
		database: process.env.TYPEORM_DATABASE,
		entities: ['src/database/entities/**/*.js'],
		migrations: ['src/database/migrations/**/*.js'],
		seeds: ['src/database/seeds/**/*.js'],
		factories: ['src/database/factories/**/*.js'],
		synchronize: true,
	},
	rabbitMQUrl: process.env.RABBIT_MQ_URL,
};
