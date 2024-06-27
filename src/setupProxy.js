const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/matrixtraining/wp-json/custom/v1/additional-css',
    createProxyMiddleware({
      target: 'http://122.160.55.196:4344',
      changeOrigin: true,
    })
  );
};
