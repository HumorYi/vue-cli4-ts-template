import { removeDomByClassName } from './lib'

export default class Loading {
  className: string
  constructor(className: string = 'g-private-loadin') {
    this.className = 'g-mask' + ' ' + className
  }

  open(msg: string = '数据加载中，请稍后...'): void {
    const dom = document.createElement('div')
    dom.className = this.className
    dom.innerHTML = `
      <div class="g-loading">
        <div class="g-loading-outer g-spin-right"></div>
        <div class="g-loading-inner g-spin-left"></div>
        <div class="g-loading-msg">${msg}</div>
      </div>
    `

    document.body.appendChild(dom)
  }

  close(): void {
    removeDomByClassName(this.className)
  }
}
