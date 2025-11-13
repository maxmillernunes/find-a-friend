import { AppException } from '@/shared/errors/app-exception'
import { ErrorsCode } from '@/shared/errors/errors-code'
import { HttpStatusCodes } from '@/shared/errors/http-status-codes'

export class PetAlreadyExistsError extends AppException {
  constructor(name: string) {
    super(
      `Pet with name ${name} already exists`,
      HttpStatusCodes.CONFLICT,
      ErrorsCode.PET_ALREADY_EXISTS
    )
  }
}
