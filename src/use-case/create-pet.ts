import type { PetsRepository } from '@/repositories/pets-repository'
import type {
  LevelEnergy,
  LevelIndependency,
  Pet,
  PetSize,
} from '@prisma/client'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  description: string
  levelEnergy: LevelEnergy
  levelIndependency: LevelIndependency
  environmentType: string
  size: PetSize
  latitude: number
  longitude: number
  adoptionRequirements: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    adoptionRequirements,
    description,
    environmentType,
    latitude,
    levelEnergy,
    levelIndependency,
    longitude,
    name,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const petAlreadyExists = await this.petsRepository.findByName(name)

    if (petAlreadyExists) {
      throw new PetAlreadyExistsError(name)
    }

    const pet = await this.petsRepository.create({
      orgId,
      adoptionRequirements,
      environmentType,
      latitude,
      levelEnergy,
      levelIndependency,
      longitude,
      name,
      size,
      description,
    })

    return { pet }
  }
}
