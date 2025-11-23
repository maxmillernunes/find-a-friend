import type {
  LevelEnergy,
  LevelIndependency,
  Pet,
  PetAge,
  PetSize,
  Prisma,
} from '@prisma-client'

export interface FindPetsParams {
  city?: string
  age?: PetAge
  description?: string
  levelEnergy?: LevelEnergy
  levelIndependency?: LevelIndependency
  size?: PetSize
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByName(name: string): Promise<Pet | null>
  findById(petId: string): Promise<Pet | null>
  find(data: FindPetsParams): Promise<Pet[]>
}
