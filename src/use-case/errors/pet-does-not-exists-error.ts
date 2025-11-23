import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class PetDoesNotExistsError extends AppException {
  constructor() {
    super(
      `Pet does not exists`,
      HttpStatusCodes.CONFLICT,
      ErrorsCode.PET_DOES_NOT_EXISTS
    )
  }
}
