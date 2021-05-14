import { galleryService } from 'Shared/Http/GalleryService';

export const getRequest = async (params) => {
  try {
    const result = await galleryService.get(`/?${params}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (values) => {
  try {
    const result = await galleryService.post('/', values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const result = await galleryService.delete(`?id=${id}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (values) => {
  try {
    const result = await galleryService.put('/', values);
    return result;
  } catch (error) {
    throw error;
  }
};
