interface RowUpOption {
  size: number
  step: number
  obj: object
  prop: string
  start?: number
  duration?: number
}

export default class Animation {
  static rowUp({ size, step, obj, prop, start = 0, duration = 1500 }: RowUpOption) {
    if (size <= 0) {
      return
    }

    setInterval(() => {
      start = start < size - 1 ? start + 1 : 0

      obj[prop] = start * step
    }, duration)
  }
}
