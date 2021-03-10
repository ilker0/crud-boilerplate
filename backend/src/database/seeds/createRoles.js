const Role = require('../entities/role');
const Permissions = require('../../utils/permissions');
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
