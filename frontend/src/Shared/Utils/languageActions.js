const changeLanguage = (val, i18n) => {
  i18n.changeLanguage(val);
  localStorage.setItem('language', val);
};

const defaultLanguage = () => {
  const lang = localStorage.getItem('language');
  return lang || 'en';
};

export { changeLanguage, defaultLanguage };
