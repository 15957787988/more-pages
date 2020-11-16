import constants from './constants'
import { loadScript } from './lib'

/**
 * 支付宝 JSSDK 官方文档：
 * http://myjsapi.alipay.com/alipayjsapi/index.html
 *
 */
function AliSdk() {
  if (!window.ap) {
    loadSDKScript()
  }
  /**
   * 获取经纬度
  */
  this.getLocation = function() {
    return new Promise((resolve, reject) => {
      window.ap.getLocation(res => {
        resolve(res)
      })
    })
  }
  /**
 * 获取图片
 * num: 获取图片的个数
 */
  this.chooseImage = function(num) {
    return new Promise((resolve, reject) => {
      window.ap.chooseImage(num, function(res) {
        if ( img instanceof HTMLImageElement ) {
          resolve(res)
        }
      })
    })
  }
}

async function loadSDKScript () {
  try {
    await loadScript(constants.ALI_SDK)
    if (!window.ap) throw new Error('未获取到支付宝 SDK')
  } catch (e) {
    throw new Error(`SDK 脚本加载失败:${e}`)
  }
}
export default AliSdk