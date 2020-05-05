/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:http请求
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime: 2020-04-03 18:00:22
 */
import axios from 'axios'
import qs from 'qs'

import Counter from '../utils/counter'
import Loading from '../utils/loading'
import Download from '../utils/download'

import { responseStatusCode } from '../config/api'

const requestCounter = new Counter()
const loading = new Loading()
const download = new Download()

const extendRequestConfig = {
  get(config: object, param: object) {
    config['params'] = param
  },
  post(config: object, param: object) {
    config['data'] = param
  }
}

const getRequestConfig = (method: any, url: string, param: object): object => {
  const requestConfig = { url, method }

  extendRequestConfig[method] && extendRequestConfig[method](requestConfig, param)

  return requestConfig
}

// 默认不启用 cookie
// axios.defaults.withCredentials = true

// api url
axios.defaults.baseURL = process.env.API_URL

// 无效，axios bug
// axios.defaults.headers.post['content-type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(
  (config: object): object => {
    if (config['data'] && config['method'] === 'post' && config['data'].constructor !== FormData) {
      // 格式化模式有三种：indices、brackets、repeat
      config['data'] = qs.stringify(config['data'], { arrayFormat: 'repeat' })
    }

    requestCounter.increase()

    loading.open()

    return config
  },
  (error: any): any => Promise.reject(error)
)

axios.interceptors.response.use(
  (response: any): any => {
    requestCounter.decrease()

    requestCounter.isFinished() && loading.close()

    return response
  },
  (error: any): any => Promise.reject(error)
)

export const request = (method: any, url: any, param: any = {}) => {
  const requestConfig = getRequestConfig(method, url, param)

  return axios(requestConfig)
    .then((res: object) => {
      const data = res['data']
      const responseStatusCodeConfig = responseStatusCode[data['code']] || responseStatusCode.default

      return responseStatusCodeConfig.cb(data['msg'], data.data)
    })
    .catch((err: any) => {
      throw new Error(err)
    })
}

export const requestFile = (method: any, url: any, param: any = {}, filenamePrefix: string = '') => {
  const requestConfig = getRequestConfig(method, url, param)

  /**
   * 使用axios下载excel文件解决乱码问题
   *  1. 须将axios 配置中的responseType设置为arraybuffer，这样就不会让表格出现乱码现象；
   *  2. 如果要动态设置文件名则需要让后台将名字设置到响应头中，否则将是一个乱码的文件名；
   *  3. 然后通过<a></a> 标签的特性来自动点击下载文件；
   *  4. 如果要兼容IE则需要利用navigator.msSaveOrOpenBlob方法；
   *  5. 兼容Firefox 须将<a></a> 标签添加到body中，最后再移除<a></a> 标签
   */
  requestConfig['responseType'] = 'arraybuffer'

  return axios(requestConfig)
    .then((res: object) => {
      // 内容部署
      const contentDisposition = res['headers']['content-disposition']

      if (!contentDisposition) {
        download.error(filenamePrefix)

        return
      }

      // 二进制流文件数据
      const blob = new Blob([res['data']])
      const filename = filenamePrefix + download.getFilenameSuffix(contentDisposition)

      download.download(blob, filename)
    })
    .catch((err: any) => {
      throw new Error(err)
    })
}
