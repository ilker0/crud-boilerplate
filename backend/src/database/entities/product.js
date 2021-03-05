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
    fk_basket: {
      target: 'Basket',
      type: 'one-to-many',
      cascade: true,
    },
    fk_cat: {
      target: 'Category',
      type: 'many-to-one',
      cascade: true,
    },
  },
});
