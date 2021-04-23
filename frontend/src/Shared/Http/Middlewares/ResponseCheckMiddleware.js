const successCheck = async (response) => response.data;

const errorCheck = async (error) => {
  return Promise.reject(error.response.data.errors);
};

export { successCheck, errorCheck };
