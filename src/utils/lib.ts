const removeDomByClassName = (className: string): void => {
  className = className
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('.')

  if (className[0] !== '.') {
    className = '.' + className
  }

  const doms = [...document.querySelectorAll(className)]

  doms.forEach(dom => dom.parentElement && dom.parentElement.removeChild(dom))
}

const extendObject = (output: object, input: object): object => {
  for (const key in input) {
    output[key] = input[key]
  }

  return output
}

const extendObjectValue = (output: object, input: object, origin: object, extend: object): object => {
  for (const key in input) {
    output[input[key]] = origin[key]
  }

  for (const key in extend) {
    output[key] = extend[key]
  }

  return output
}

const filterObjectKeys = (obj: object, filters: [any]): object => {
  const result = {}

  for (const key in obj) {
    if (filters.indexOf(key) === -1) {
      result[key] = obj[key]
    }
  }

  return result
}

const toDecimal = (value: number, bit = 1, rate = 100): string => {
  if (value >= 0 && value < 1) {
    return '0.' + ''.padEnd(bit, '0')
  }

  const ret = String(value / rate).split('.')
  const intPrice = Number(ret[0])
  let decimalPrice = ret[1] || ''
  const decimalPriceLen = decimalPrice.length

  if (decimalPriceLen > bit) {
    decimalPrice = decimalPrice.slice(0, bit)
  } else if (decimalPriceLen < bit) {
    decimalPrice = decimalPrice.padEnd(bit, '0')
  }

  return intPrice + '.' + decimalPrice
}

export { removeDomByClassName, extendObject, extendObjectValue, filterObjectKeys, toDecimal }
