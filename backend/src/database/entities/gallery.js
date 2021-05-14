const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
	name: 'Gallery',
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
			unique: true,
		},
		filePath: {
			type: 'text',
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
	},
});
