import { extendObject } from './lib'

interface Option {
  msg?: string
  timeout?: number
  openIcon?: boolean
  openClose?: boolean
  autoClose?: boolean
}

export default class Message {
  containerWrapId: string = 'g-message-wrap'
  containerClassName: string = 'g-message'

  success(option: Option | string): void {
    this.add(option, 'success', '')
  }
  error(option: Option | string): void {
    this.add(option, 'error', '')
  }
  warning(option: Option | string): void {
    this.add(option, 'warning')
  }
  info(option: Option | string): void {
    this.add(option, 'info')
  }
  add(option: Option | string, className: string = 'info', iconChar: string = 'i'): void {
    const extendOption = this.getExtendOption(option)
    const extendClassName = this.containerClassName + ' ' + 'g-fade-in-top' + ' ' + className
    const container = document.createElement('div')
    let containerWrap = document.getElementById(this.containerWrapId)

    if (containerWrap === null) {
      containerWrap = document.createElement('div')
      containerWrap.id = this.containerWrapId
      document.body.appendChild(containerWrap)
    }

    container.className = extendClassName
    container.innerHTML = this.generate(extendOption, iconChar)

    containerWrap.appendChild(container)

    if (extendOption['autoClose']) {
      setTimeout(() => this.remove(), extendOption['timeout'])
    }
  }
  remove(removeAll: boolean = false, size: number = 1): void {
    const containerWrap = document.getElementById(this.containerWrapId)

    if (!containerWrap) {
      throw new Error('您还未创建提示')
    }

    if (removeAll) {
      containerWrap.parentElement && containerWrap.parentElement.removeChild(containerWrap)

      return
    }

    const child = [...containerWrap.getElementsByClassName(this.containerClassName)]
    child.forEach(dom => containerWrap.removeChild(dom))

    if (!containerWrap.hasChildNodes() && containerWrap.parentElement) {
      containerWrap.parentElement.removeChild(containerWrap)
    }
  }
  getExtendOption(option: Option | string = {}): object {
    const defaultOption: Option = {
      msg: '',
      timeout: 2000,
      openIcon: true,
      openClose: true,
      autoClose: true
    }

    if (typeof option === 'string') {
      defaultOption['msg'] = option
    } else {
      extendObject(defaultOption, option)
    }

    return defaultOption
  }
  generate({ msg, openIcon, openClose }: Option, iconChar: string = 'i'): string {
    const iconDom = '<i class="icon">' + iconChar + '</i>'
    const msgDom = '<span>' + msg + '</span>'
    const closeDom =
      '<span class="close" onclick="this.parentElement.parentElement.removeChild(this.parentElement)">×</span>'

    let content = ''

    if (openIcon) {
      content += iconDom
    }

    content += msgDom

    if (openClose) {
      content += closeDom
    }

    return content
  }
}
