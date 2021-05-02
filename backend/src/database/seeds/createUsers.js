const User = require('../entities/user');
const { hashPassword } = require('../../utils/hash');

class UserSeed {
	async run(factory, connection) {
		await connection
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([
				{
					name: 'Admin',
					surname: 'Admin',
					username: 'admin123',
					email: 'ilker46580@gmail.com',
					role: 'ADMIN',
					password: await hashPassword('admin123.'),
				},
			])
			.execute();
	}
}

module.exports = { UserSeed };
