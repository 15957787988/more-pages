/**
 * 清理 dist/ 目录下的多余文件
 */
const path = require('path')
const fs = require('fs')


function matchAll(reg, str) {
  if (reg.flags.indexOf('g') === -1) reg.flags += 'g'

  const matches = []
  let match
  while (match = reg.exec(str)) {
    matches.push(match)
    reg.lastIndex = match.index + 1
  }
  return matches
}


const distDir = path.resolve(__dirname, '../dist')

function cleanDist() {
  const usedFiles = getUsedFiles()
  const notUsedFiles = getNotUsedFiles(path.join(distDir, 'static'), usedFiles)

  if (notUsedFiles.length) {
    console.log(`[cleanDist] 发现 ${notUsedFiles.length} 个未被使用的文件，开始清理...`)
    notUsedFiles.forEach(filepath => {
      console.log('  ' + filepath.replace(distDir, ''))
      fs.unlinkSync(filepath)
    })
  }
}

/**
 * 找出 static/ 下没有被用到的文件
 */
function getNotUsedFiles(dir, usedFiles) {
  let files = []
  fs.readdirSync(dir).forEach(filepath => {
    const abspath = path.join(dir, filepath)
    if (fs.lstatSync(abspath).isDirectory()) {
      files.push(...getNotUsedFiles(abspath, usedFiles))
    } else {
      if (!usedFiles.has(abspath)) files.push(abspath)
    }
  })
  return files
}


/**
 * 返回 static/ 下被使用到的文件列表
 */
function getUsedFiles() {
  let files = new Set()

  // 分析各 html 引用到的文件
  fs.readdirSync(distDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(distDir, f))
    .forEach(htmlPath => {
      const filesInHtml = getUsedFilesInHtml(htmlPath)
      files = new Set([...files, ...filesInHtml])
    })

  // 分析各 js 脚本引用到的文件
  Array.from(files)
    .filter(f => f.endsWith('.js'))
    .forEach(jsPath => {
      const filesInJs = getUsedFilesInJs(jsPath)
      files = new Set([...files, ...filesInJs])
    })

  // 分析各 js 脚本引用到的文件
  Array.from(files)
    .filter(f => f.endsWith('.css'))
    .forEach(cssPath => {
      const filesInCss = getUsedFilesInCss(cssPath)
      files = new Set([...files, ...filesInCss])
    })

  return files
}

/**
 * 返回指定 html 文件内引用到的文件列表
 */
function getUsedFilesInHtml(htmlPath) {
  const content = fs.readFileSync(htmlPath).toString()
  const matches = matchAll(/(?<=\=)(static\/.+?)(?= |>)/g, content)
  return matches
    .map(m => m[0])
    .map(f => path.join(distDir, f))
}

/**
 * 返回指定 JavaScript 文件里引用到的文件列表
 * 注意：这部分匹配规则和 webpack 配置相关，打包配置如有调整，这里可能也要跟着改
 */
function getUsedFilesInJs(jsPath) {
  const content = fs.readFileSync(jsPath).toString()
  // 例子1：
  // "static/js/"+({HelloWorld:"HelloWorld"}[t]||t)+"."+{HelloWorld:"38311720"}[t]+".js"
  // 例子2：
  // "static/js/"+({"account.i18n-en_US":"account.i18n-en_US","account.i18n-th_TH":"account.i18n-th_TH","account.i18n-zh_CN":"account.i18n-zh_CN","account.i18n-zh_HK":"account.i18n-zh_HK"}[t]||t)+"."+{"account.i18n-en_US":"77ed69e1","account.i18n-th_TH":"21ef4ded","account.i18n-zh_CN":"76f62415","account.i18n-zh_HK":"23956af2"}[t]+".js"
  const reg = /"static\/js\/"\+\(\{.+?\}.+?\)\+"\."\+(\{.+?\})\[\w+\]\+"\.js"/g
  const scripts = []
  matchAll(reg, content).forEach(match => {
    // match 出来的东西可能不是合法的 JSON，例如是 {shopinfo: 'abcd12'}，所以要以 JavaScript 的方式执行来取值
    const hashMap = new Function(`return ${match[1]}`)()
    const subScripts = Object.keys(hashMap).map(key =>
      path.join(distDir, `static/js/${key}.${hashMap[key]}.js`)
    )
    scripts.push(...subScripts)
  })
  return scripts
}


/**
 * 返回指定 CSS 文件里引用到的文件列表
 */
function getUsedFilesInCss(cssPath) {
  const content = fs.readFileSync(cssPath).toString()
  // 例子：
  // @font-face{font-family:FUN Number;src:url(../../static/fonts/FUN\ Number.844993f2.ttf);
  const reg = /url\(..\/..\/(static\/.+?)\)/g
  const matches = matchAll(reg, content)
  return matches
    .map(m => m[1].replace(/\\/g, ''))
    .map(f => path.join(distDir, f))
}


cleanDist()
