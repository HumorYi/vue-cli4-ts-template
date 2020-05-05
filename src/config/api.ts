import Message from '@/utils/message'
const message = new Message()

const responseStatusCode = {
  '1': {
    msg: '响应成功',
    cb: (data: any): any => {
      console.log('api response success')
      return data
    }
  },
  default: {
    msg: '响应失败',
    cb: (msg: any): Error => {
      console.log('api response failed')
      message.error(msg)
      throw new Error(msg)
    }
  }
}

export { responseStatusCode }
