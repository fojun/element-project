const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  // lintOnSave: false
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://你的后端地址:端口', // 例如 http://localhost:8081
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' }
  //     }
  //   }
  // }
})
