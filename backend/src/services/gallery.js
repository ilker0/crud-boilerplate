const { createPhotoSchema, updatePhotoSchema, deletePhotoSchema } = require('../validations/gallery');
const { create, update, selectOne, deleteOne, selectAll } = require('../database/repositories/gallery');
const errorHandler = require('../utils/errorHandler');
const { alreadyHave, notFound } = require('../utils/errors');
const queryParser = require('../utils/queryParser');
var path = require('path');

class GalleryService {
	createPhoto = async request => {
		try {
			const { body: data, user, files } = request;
			const { error } = createPhotoSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { name } = data;

			const photo = await selectOne({ name });

			if (photo) {
				throw { name: 'RequestError', message: alreadyHave('NAME') };
			}

			const file = files.image;
			const fileName = name + '.png';
			const filePath = path.join(__dirname, '../../uploads/' + fileName);
			await file.mv(filePath);

			data.user = user.id;
			data.filePath = fileName;

			const result = await create(data);
			return result;
		} catch (error) {
			console.log(error);
			throw errorHandler(error);
		}
	};

	getPhotos = async request => {
		try {
			const { query } = request;
			const parsedQuery = queryParser.parseQuery(query);
			parsedQuery.relations = ['user'];
			parsedQuery.order = {
				createdAt: 'ASC',
				...parsedQuery.order,
			};

			const result = await selectAll(parsedQuery);

			result[0].forEach(item => {
				item.user = item.user.username;
			});

			return {
				data: result[0] || [],
				count: result[1] || 0,
			};
		} catch (error) {
			throw errorHandler(error);
		}
	};

	updatePhoto = async request => {
		try {
			const { body: data, user, files } = request;
			const { error } = updatePhotoSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { id, name } = data;

			const file = files.image;
			const fileName = name + '.png';
			const filePath = path.join(__dirname, '../../uploads/' + fileName);
			await file.mv(filePath);

			data.user = user.id;
			data.filePath = fileName;

			const photo = await selectOne({ id });

			if (!photo) {
				throw { name: 'RequestError', message: notFound('PHOTO') };
			}

			const result = await update(data, { id });
			return result;
		} catch (error) {
			console.log(error);
			throw errorHandler(error);
		}
	};

	deletePhoto = async request => {
		try {
			const { query: data } = request;

			const { error } = deletePhotoSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { id } = data;
			const photo = await selectOne({ id });

			if (!photo) {
				throw { name: 'RequestError', message: notFound('PHOTO') };
			}

			const result = await deleteOne({ id });
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};
}

module.exports = new GalleryService();
