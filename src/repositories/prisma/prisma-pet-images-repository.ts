import { prisma } from '@/lib/prisma'
import type { Prisma } from '@/prisma-client'
import type { PetImagesRepository } from '../pet-images-repository'

export class PrismaPetImagesRepository implements PetImagesRepository {
  async create(data: Prisma.PetImagesUncheckedCreateInput): Promise<void> {
    await prisma.petImages.create({ data })
  }
}
