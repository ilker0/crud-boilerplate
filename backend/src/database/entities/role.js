const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Role',
  columns: {
    name: {
      type: 'varchar',
      unique: true,
      primary: true,
      nullable: false,
    },
    permissions: {
      type: 'text',
      array: true,
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
      type: 'one-to-many',
      cascade: true,
      name: 'User',
    },
  },
});
