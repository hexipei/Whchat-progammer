import Taro from '@tarojs/taro'
import md5 from './md5.min.js'

const appid = '20180912000205732'
const key = 'oowRg0jxzoSgwCfAfyVn'

function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto'}) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    Taro.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if(res.data && res.data.trans_result) {
          resolve(res.data)
        } else{
          reject({status: 'error', msg: '翻译失败'})
          Taro.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({status: 'error', msg: '翻译失败'})
        Taro.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
exports = translate