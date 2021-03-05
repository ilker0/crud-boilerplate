const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Basket',
  columns: {
    id: {
      name: 'id',
      type: 'varchar',
      primary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    },
  },
  relations: {
    fk_prod: {
      target: 'Product',
      type: 'many-to-one',
      cascade: true,
    },
    fk_user: {
      target: 'User',
      type: 'many-to-one',
      cascade: true,
    },
  },
});
