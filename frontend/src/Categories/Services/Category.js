import { categoryService } from 'Shared/Http/CategoryService';

export const getRequest = async (params) => {
  try {
    const result = await categoryService.get('/', {
      params,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
