const successCheck = async (response) => response.data;

const errorCheck = async (error) => {
  if (error.response && error.response.status) {
    if (error.response.status === 400) {
      return Promise.reject(error.response.data.errors);
    }
  }

  return Promise.reject(error);
};

export { successCheck, errorCheck };
