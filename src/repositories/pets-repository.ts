import type { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByName(name: string): Promise<Pet | null>
}
