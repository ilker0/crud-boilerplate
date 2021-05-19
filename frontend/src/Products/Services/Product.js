import { productService } from 'Shared/Http/ProductService';

export const getRequest = async (params) => {
  try {
    const result = await productService.get(`/?${params}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (values) => {
  try {
    const result = await productService.post('/', values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const result = await productService.delete(`?id=${id}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (values) => {
  try {
    const result = await productService.put('/', values);
    return result;
  } catch (error) {
    throw error;
  }
};
