const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      name: 'id',
      type: 'varchar',
      primary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    },
    name: {
      type: 'text',
    },
    surname: {
      type: 'text',
    },
    username: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
});
