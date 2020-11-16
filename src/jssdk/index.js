import WXSDK from './Wxsdk'
import ALISDK from './Alisdk'
function SDKHelper() {
  const ua = window.navigator ? window.navigator.userAgent : ''
  const config = {
    debug: 0,         // 是否开启 SDK 调试模式
    apiBase: '',      // 请求接口的 base url，必填
    entityId: '',     // 当前 entityId，必填
    token: '',        // 当前 token，必填
    isRetail: false,  // 是否是零售流程，会影响分享信息的获取
    isTrain: false,   // 是否是高铁流程，会影响分享信息的获取
    ...config
  }
  /**
   * 判断当前所处平台。
   * WX: 微信 App
   * ALI: 支付宝 App
   * '':  未知平台
   *
   * 平台下，可能还有多种客户端，如微信 H5 和微信小程序内嵌
   */
  function detectPlatform() {
    if (ua.indexOf('MicroMessenger') > -1) {
      return 'WX'
    } else if (ua.indexOf('AlipayClient') > -1) {
      return 'ALI'
    } else if (ua.toLowerCase().indexOf('easi') > -1) {
      return 'EASI'
    } else {
      return ''
    }
  }

  const platform = detectPlatform()
  if (platform === 'WX') {
    WXSDK(config)
  } else if (platform === 'ALI') {
    return new ALISDK()
  }
}

export default SDKHelper

