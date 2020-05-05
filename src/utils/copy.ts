import clipboard from 'clipboard'
import Message from './message'
const message = new Message()

interface Option {
  config?: object
  successMsg?: string
  errorMsg?: string
}

export default class Copy {
  clipboard: clipboard
  constructor(selector: string, { config = {}, successMsg, errorMsg }: Option) {
    this.clipboard = new clipboard(selector, config)

    this.success(successMsg)
    this.error(errorMsg)
  }

  success(msg: string = '复制成功'): void {
    this.clipboard.on('success', (e): void => {
      message.success(msg)
      this.clear(e)
    })
  }

  error(msg: string = '由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！'): void {
    this.clipboard.on('error', (e): void => {
      message.error(msg)
      this.clear(e)
    })
  }

  clear(e: object): void {
    e['clearSelection']()
    this.clipboard.destroy()
  }
}
