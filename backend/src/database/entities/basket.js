const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Basket',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generationStrategy: 'uuid',
      generated: 'uuid',
      nullable: false,
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
