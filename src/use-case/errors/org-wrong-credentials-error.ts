import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class OrgWrongCredentialsError extends AppException {
  constructor() {
    super(
      'Credential error',
      HttpStatusCodes.BAD_REQUEST,
      ErrorsCode.ORG_WRONG_CREDENTIALS
    )
  }
}
