/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:过滤器
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime: 2020-02-26 16:16:01
 */
import { toDecimal } from '../utils/lib'

const padStartZero = (data: any): string => {
  const strData = String(data)
  return strData.length < 2 ? '0' + strData : strData
}
const price = (value: any): string => {
  const numValue = Number(value)
  return typeof numValue === 'number' ? '￥' + value : value
}

export default [
  {
    name: 'tenThousand',
    /**
     * 金额超过万的过滤器
     * @param {Number} value 数据
     */
    fn(value: number, isPrice = false, start = 10000): string | number {
      let result = 0

      if (value >= start) {
        result = value / start

        if (result > 0) {
          result = Number(result.toFixed(2))
        }

        if (isPrice) {
          result = Number(price(result))
        }

        return result + '万'
      }

      return value
    }
  },
  {
    name: 'date',
    fn(value: number, splitSymbol = '.'): string {
      // value => seconds
      const date = new Date(value * 1000)
      const year = date.getFullYear()
      const month = padStartZero(date.getMonth() + 1)
      const day = padStartZero(date.getDate())

      return year + splitSymbol + month + splitSymbol + day
    }
  },
  {
    name: 'datetime',
    fn: (value: any, dateSplitSymbol = '-', timeSplitSymbol = ':'): string => {
      const date = new Date(value)
      const year = date.getFullYear()
      const month = padStartZero(date.getMonth() + 1)
      const day = padStartZero(date.getDate())
      const hour = padStartZero(date.getHours())
      const minutes = padStartZero(date.getMinutes())
      const seconds = padStartZero(date.getSeconds())

      return (
        year +
        dateSplitSymbol +
        month +
        dateSplitSymbol +
        day +
        ' ' +
        hour +
        timeSplitSymbol +
        minutes +
        timeSplitSymbol +
        seconds
      )
    }
  },
  {
    name: 'coupon',
    fn(value: number, rate = 100): string {
      return (value > 0 ? '￥' + Math.floor(value / rate) : '暂无') + '券'
    }
  },
  {
    name: 'percent',
    fn(value: number): string {
      return value + '%'
    }
  },
  {
    name: 'price',
    fn(value: number): string {
      return price(value)
    }
  },
  {
    name: 'earn',
    fn(value: number): string {
      return toDecimal(value, 2)
    }
  },
  {
    name: 'decimals',
    fn(value: any, bit = 2): string {
      const result = Number(value)
      return result > 0 ? result.toFixed(bit) : '0'
    }
  },
  {
    name: 'mobile',
    fn(value: string): string {
      return value.slice(0, 3) + '****' + value.slice(7)
    }
  }
]
