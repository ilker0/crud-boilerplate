const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generationStrategy: 'uuid',
      generated: 'uuid',
      nullable: false,
    },
    name: {
      type: 'text',
    },
    surname: {
      type: 'text',
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    currentHashedRefreshToken: {
      type: 'varchar',
      nullable: true,
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
    category: {
      target: 'Category',
      type: 'one-to-many',
      cascade: true,
    },
    product: {
      target: 'Product',
      type: 'one-to-many',
      cascade: true,
    },
    role: {
      target: 'Role',
      type: 'many-to-one',
      cascade: true,
    },
  },
});
