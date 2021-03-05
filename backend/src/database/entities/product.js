const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Product',
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
    price: {
      type: 'varchar',
    },
  },
  relations: {
    fk_cat: {
      target: 'Category',
      type: 'one-to-many',
      joinTable: true,
      cascade: true,
    },
  },
});
