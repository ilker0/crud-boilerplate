const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: 'Images',
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
		path: {
			type: 'varchar',
		},
		type: {
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
});
