import { prisma } from '@/lib/prisma'
import type { Pet, Prisma } from '@/prisma-client'
import type { FindPetsParams, PetsRepository } from '../pets-repository'

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

  async find({
    age,
    city,
    description,
    levelEnergy,
    levelIndependency,
    size,
  }: FindPetsParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        adopted: false,
        age,
        description,
        levelEnergy,
        levelIndependency,
        size,
        orgAddress: {
          city,
        },
      },
    })

    return pets
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
      include: {
        org: true,
        orgAddress: true,
      },
    })

    return pet
  }
}
