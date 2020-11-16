import constants from './constants'
import { loadScript } from './lib'

function WXSDK() {
  function init () {
    loadScript(constants.WX_SDK)
  }
  init()

  function scanQRCode(options) {
    return new Promise((resolve, reject) => {
      window.wx.scanQRCode({
        needResult: true,
        success: res => {
          const content = res.resultStr
          if (options.getResult) {
            resolve(content)
          } else {
            this._jump(content)
            resolve()
          }
        },
        fail({ errMsg }) { reject(new Error(errMsg)) },
        cancel() { resolve() }
      })
    })
  }
}

export default WXSDK