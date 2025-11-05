import { ErrorsCode } from './errors-code'
import { HttpStatusCodes } from './http-status-codes'

export class AppException {
  public readonly message: string
  public readonly statusCode: number
  public readonly errorCode: ErrorsCode

  constructor(
    message: string,
    statusCode = HttpStatusCodes.BAD_REQUEST,
    errorCode = ErrorsCode.INTERNAL_SERVER_ERROR
  ) {
    this.message = message
    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}
