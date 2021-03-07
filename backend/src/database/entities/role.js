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
    fk_user: {
      target: 'User',
      type: 'one-to-many',
      cascade: true,
    },
  },
});
