const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const ENVIRONMENT =
  process.env.NODE_ENV === PRODUCTION ? PRODUCTION : DEVELOPMENT;
const ENTRY_POINT = './src/index.tsx';
const OUTPUT_PATH = '/frontend/';
const HTML_TEMPLATE = '/public/index.html';

module.exports = {
  PRODUCTION,
  DEVELOPMENT,
  ENTRY_POINT,
  OUTPUT_PATH,
  HTML_TEMPLATE,
  ENVIRONMENT,
};
