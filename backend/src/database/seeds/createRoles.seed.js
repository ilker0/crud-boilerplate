const Role = require('../entities/role');

class RoleSeed {
  async run(factory, connection) {
    console.log('SEED RUNNNN !');
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([{ name: 'EDITOR', permissions: ['SELECT_CATEGORY'] }])
      .execute();
  }
}

module.exports = RoleSeed;
