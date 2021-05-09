import { categoryService } from 'Shared/Http/CategoryService';

export const getRequest = async (params) => {
  try {
    const result = await categoryService.get(`/?${params}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (values) => {
  try {
    const result = await categoryService.post('/', values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const result = await categoryService.delete(`?id=${id}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (values) => {
  try {
    const result = await categoryService.put('/', values);
    return result;
  } catch (error) {
    throw error;
  }
};
