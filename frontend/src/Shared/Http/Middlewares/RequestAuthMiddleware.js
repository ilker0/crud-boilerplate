export default async (request) => {
  const token = localStorage.getItem('userToken');

  if (token) {
    request.headers.common.user_token = token;
  }

  return request;
};
