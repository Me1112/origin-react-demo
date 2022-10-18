const proxy = require('http-proxy-middleware');
const path = require('path');
const apiMocker = require('mocker-api');
const paths = require('./config/paths');

module.exports = function(app) {
  // 代理模式
  if (process.env.PROXY === 'true' && process.env.PROXY_HOST) {
    app.use(
      proxy('/api', {
        target: process.env.PROXY_HOST,
      })
    );
  } else {
    // mock 模式
    apiMocker(app, path.resolve(paths.appPath, './mock/index.js'), {
      changeHost: true,
    });
  }
};
