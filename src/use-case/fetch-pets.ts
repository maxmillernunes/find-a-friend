import type { PetsRepository } from '@/repositories/pets-repository'
import type {
  LevelEnergy,
  LevelIndependency,
  Pet,
  PetAge,
  PetSize,
} from '@/prisma-client'

interface FetchPetsUseCaseRequest {
  city: string
  age?: PetAge
  description?: string
  levelEnergy?: LevelEnergy
  levelIndependency?: LevelIndependency
  size?: PetSize
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: FetchPetsUseCaseRequest
  ): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.find(data)

    return { pets }
  }
}
