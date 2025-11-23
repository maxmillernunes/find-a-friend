import { GetPetByIdUseCase } from '../get-pet-by-id'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)

  return getPetByIdUseCase
}
