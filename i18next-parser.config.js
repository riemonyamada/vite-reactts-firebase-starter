module.exports = {
  defaultValue: '',
  keySeparator: '.',
  locales: ['en', 'ja'],
  // for https://github.com/i18next/i18next-http-backend
  // output: 'public/locales/$LOCALE/$NAMESPACE.json',
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  sort: true,
};
