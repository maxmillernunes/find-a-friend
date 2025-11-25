import type { PetsRepository } from '@/repositories/pets-repository'
import type {
  LevelEnergy,
  LevelIndependency,
  Pet,
  PetAge,
  PetSize,
} from '@/prisma-client'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

interface CreatePetUseCaseRequest {
  orgId: string
  orgAddressId: string
  name: string
  description: string
  age: PetAge
  levelEnergy: LevelEnergy
  levelIndependency: LevelIndependency
  environmentType: string
  size: PetSize
  adoptionRequirements: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    orgAddressId,
    adoptionRequirements,
    description,
    age,
    environmentType,
    levelEnergy,
    levelIndependency,
    name,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const petAlreadyExists = await this.petsRepository.findByName(name)

    if (petAlreadyExists) {
      throw new PetAlreadyExistsError(name)
    }

    const pet = await this.petsRepository.create({
      orgId,
      orgAddressId,
      adoptionRequirements,
      environmentType,
      levelEnergy,
      levelIndependency,
      name,
      size,
      description,
      age,
    })

    return { pet }
  }
}
