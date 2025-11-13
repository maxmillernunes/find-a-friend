import type { Pet, Prisma } from '@prisma/client'
import type { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findByName(name: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        name: name,
      },
    })

    return pet
  }
}
