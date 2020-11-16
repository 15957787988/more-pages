const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const gzipSourceList = ['css', 'js']

let pages = require('./config.pages.js')
const resolveApp = (dir) => path.resolve(__dirname, '../', dir)

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  outputDir: resolveApp('./dist'), // build path
  pages, // more pages config
  productionSourceMap: false, // don·t use map
  devServer: {
    port: 8081, // port
    open: true, // default browser
    overlay: {
      warnings: true, // eslint show warnings
      errors: true // eslint show errors
    }
  },
  
  configureWebpack: config => {
    return {
        // output: {
        //     pathinfo: isDev,
        // },
        externals: {
            // 本地开发引入 node_modules 里的 Vue
            // 生产环境在 HTML 里通过 CDN 引入 Vue
            vue: isProd ? 'Vue' : false,
        },
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
        resolve: {
            alias: {
                // 代码里可以使用 '@/' 引用项目根目录，避免出现 '../../../lib' 这样的代码
                '@': 'src',
            }
        }
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
