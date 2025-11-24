import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@/prisma-client'
import { PetDoesNotExistsError } from './errors/pet-does-not-exists-error'

interface GetPetByIdUseCaseRequest {
  petId: string
}

interface GetPetByIdUseCaseResponse {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetDoesNotExistsError()
    }

    return { pet }
  }
}
