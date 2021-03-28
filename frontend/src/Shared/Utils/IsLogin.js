export const isLogin = () => {
  if (localStorage.getItem('userToken')) {
    return true;
  }

  return false;
};
