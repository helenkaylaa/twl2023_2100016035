const { defineConfig } = require('@vue/cli-service')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // Konfigurasi tambahan yang diperlukan
        return options;
      });
  },
};
