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
  
  configureWebpack: config => {
    return {
        optimization: {
            // https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks
            splitChunks: {
                cacheGroups: {
                    // vendors: {
                    //     name: 'chunk-vendors',
                    //     test: /[\\\/]node_modules[\\\/]/,
                    //     priority: -10,
                    //     chunks: 'initial'
                    // },
                    // common: {
                    //     name: 'chunk-common',
                    //     minChunks: 3,
                    //     minSize: 1,
                    //     priority: -20,
                    //     chunks: 'initial',
                    //     reuseExistingChunk: true
                    // },

                    // 不需要把 node_modules 里的所有内容放入 vendor，有些东西可能只有个别页面使用
                    vendors: {
                        name: 'chunk-vendors',
                        test: /$.^/,            // 所有内容都不要加入 chunk-vendors
                        priority: -10,
                        chunks: 'initial'
                    },

                    // 因为是要各页面独立打包，没有搞自动 common chunk 的必要（计算不准）
                    common: false,
                }
            }
        },
    }

    // return new MyAwesomeWebpackPlugin()
    // vuxLoader.merge(config, {
    //   // options: {},
    //   plugins: [{
    //     // 删除重复样式
    //     name: 'duplicate-style'
    //   }, {
    //     name: 'build-done-callback',
    //     fn: function () {
    //       console.log('done!')
    //     }
    //   },]
    // })
}
}
