const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const gzipSourceList = ['css', 'js']

let pages = require('./config.pages.js')
const resolveApp = (dir) => path.resolve(__dirname, '../', dir)

module.exports = {
  publicPath: './',
  outputDir: resolveApp('./dist'), // build path
  pages, // more pages config
  productionSourceMap: false, // don·t use map
  devServer: {
    port: 1314, // port
    open: false, // default browser
    overlay: {
      warnings: true, // eslint show warnings
      errors: true // eslint show errors
    }
  },
  
  configureWebpack: config => { // open gzip
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        plugins: [
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]', // 目标资源文件名称
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + gzipSourceList.join('|') + ')$'
            ), // 匹配所有对应的文件
            threshold: 10240, // 多少kb 配置10kb
            minRatio: 0.8, // 压缩比例
            deleteOriginalAssets: false // 是否删除原始资源
          })
        ]
      }
    }
  }
}
