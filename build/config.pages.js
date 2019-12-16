const fs = require('fs')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const pagesDir = path.resolve(__dirname, '../src/pages')
const isDirectory = (item, dir) => fs.lstatSync(path.join(dir, item)).isDirectory() //path.join(dir, item)获取相对路劲， isDirectory判断是不是文件夹

// 优先读 env 里的 PAGE
// 每次必定打包index
let buildPages = null
// console.log('process.env===', process.env)
console.log('process.env.PAGES===', process.env.PAGES)
if (process.env.PAGES) {
  buildPages = process.env.PAGES.split(',')
}

// 获取文件夹名称
const pageList = fs.readdirSync(pagesDir)
      .filter( item => isDirectory(item, pagesDir))
      .filter( item => !buildPages || buildPages.indexOf(item) !== -1)
console.log('pageList==', pageList)
const pageTitles = {}
pageList.map( page => {
  let title = page
  const readmePath = path.join(pagesDir, page, 'README.md')
  if(fs.existsSync(readmePath)) { // 文件已存在
    const readme = fs.readFileSync(readmePath).toString()
    const match = readme.match(/^#\s+(.+)$/m)
    if (match) title = match[1]
  }
  pageTitles[page] = title
})

function detectEntry(pageName){
return path.join(pagesDir, pageName, 'index.js')
}

const MutiPageConfig = {}

pageList.forEach( pageName => {
  const customTemplate = path.join(pagesDir, pageName, 'index.html')
  const template = fs.existsSync(customTemplate) ? customTemplate : 'lib/index.html'
  const entry = detectEntry(pageName)

  MutiPageConfig[pageName] = {
    entry, // 应用入口配置，相当于单页面应用的main.js，必需项
    template, // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    filename: `${pageName}.html`, // 编译后在dist目录的输出文件名
    title: pageTitles[pageName], // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: [
      'chunk-vendors',
      // 'chunk-common',
      pageName,
    ],
    minify: {
      removeComments: true,
      collapseWhitespace: false,  // HTML 内容不压缩成一行。便于 git 比对，也能减少 Git 冲突的几率。
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      removeScriptTypeAttributes: true
  },
  isProd,
  }
})
module.exports = MutiPageConfig