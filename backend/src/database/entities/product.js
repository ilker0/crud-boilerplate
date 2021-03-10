const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Product',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generationStrategy: 'uuid',
      generated: 'uuid',
      nullable: false,
    },
    name: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    price: {
      type: 'varchar',
    },
    isActive: {
      type: 'enum',
      default: 1,
      enum: [0, 1],
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    },
    updateAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      cascade: true,
    },
    category: {
      target: 'Category',
      type: 'many-to-one',
      cascade: true,
    },
    image: {
      target: 'ProductImage',
      type: 'one-to-many',
      cascade: true,
    },
  },
});
