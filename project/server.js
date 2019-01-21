require('@babel/register');
['.css', '.less', '.sass', '.scss', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('@babel/polyfill');
require('./src/server.js');
