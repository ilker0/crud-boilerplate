const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Category',
  columns: {
    id: {
      name: 'id',
      type: 'varchar',
      primary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    },
    name: {
      type: 'varchar',
    },
  },
});
