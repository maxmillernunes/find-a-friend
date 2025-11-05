import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class OrgWithEmailAlreadyExistsError extends AppException {
  constructor() {
    super(
      'Org with this email already exists',
      HttpStatusCodes.CONFLICT,
      ErrorsCode.ORG_SAME_EMAIL_ALREADY_EXISTS
    )
  }
}
