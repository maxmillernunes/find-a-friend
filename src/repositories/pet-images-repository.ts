import type { Prisma } from '@/prisma-client'

export interface PetImagesRepository {
  create(data: Prisma.PetImagesUncheckedCreateInput): Promise<void>
}
