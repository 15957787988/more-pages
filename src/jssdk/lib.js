
async function retry(func, frequency = 4) {
  let times = 1
  let latestErr = null
  while (times <= frequency) {
    try {
      return await func()
    } catch (e) {
      times += 1
      latestErr = e
    }
  }
  throw new Error(`latestErr 脚本加载失败:${latestErr}`)
}

export function loadScript(url) {
  return retry(realLoadScript(url))
}
function realLoadScript(url) {
  const script = document.createElement("script")
  script.type = 'text/javascript'
  script.charset = 'UTF-8'
  script.src = url
  document.getElementsByTagName("head")[0].appendChild(script)
}