import { ResponseCode, ResponseMessage } from './code.type'


class ServiceResponse {
  constructor(code: ResponseCode, data: Array<any> = null) {
    const keyName = ResponseCode[code]
    return { code, message: ResponseMessage[keyName], success: code === ResponseCode.SUCCESS, data }
  }
}
export default ServiceResponse