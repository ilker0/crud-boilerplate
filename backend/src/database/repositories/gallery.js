const { getRepository } = require('typeorm');
const Gallery = require('../entities/gallery');

class GalleryRepository {
	create = async data => {
		try {
			const galleryRepo = getRepository(Gallery);
			const result = await galleryRepo.save(data);
			return result;
		} catch (error) {
			throw error;
		}
	};

	createBulk = async data => {};

	selectAll = async options => {
		try {
			const galleryRepo = getRepository(Gallery);
			const result = await galleryRepo.findAndCount(options);

			return result;
		} catch (error) {
			throw error;
		}
	};

	selectOne = async (filter, options) => {
		try {
			const galleryRepo = getRepository(Gallery);
			const result = await galleryRepo.findOne(filter, options);
			return result;
		} catch (error) {
			throw error;
		}
	};

	update = async (data, options) => {
		try {
			const galleryRepo = getRepository(Gallery);
			const result = await galleryRepo.update(options, data);
			return result;
		} catch (error) {
			throw error;
		}
	};

	deleteOne = async options => {
		try {
			const galleryRepo = getRepository(Gallery);
			const result = await galleryRepo.delete(options);
			return result;
		} catch (error) {
			return error;
		}
	};
}

module.exports = new GalleryRepository();
