const Role = require('../entities/role');
const permissions = require('../../utils/permissions');

class RoleSeed {
	async run(factory, connection) {
		await connection
			.createQueryBuilder()
			.insert()
			.into(Role)
			.values([
				{
					name: 'EDITOR',
					permissions: [
						permissions.selectCategory,
						permissions.createCategory,
						permissions.selectProduct,
						permissions.createProduct,
						permissions.editProduct,
						permissions.deleteProduct,
					],
				},
				{
					name: 'ADMIN',
					permissions: ['*'],
				},
			])
			.execute();
	}
}

module.exports = { RoleSeed };
