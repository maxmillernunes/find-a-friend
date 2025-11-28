import type { Pet, Prisma } from '@/prisma-client'
import { PresenterPetImageMapper } from './petImage.presenter'

export type PrismaFetchPetWithRelations = Pet &
  Prisma.PetGetPayload<{
    include: {
      pet_images: true
    }
  }>

export class PresenterFetchPetMapper {
  static toHTTP(raw: PrismaFetchPetWithRelations) {
    const pet = {
      id: raw.id,
      name: raw.name,
      age: raw.age,
      description: raw.description,
      levelEnergy: raw.levelEnergy,
      levelIndependency: raw.levelIndependency,
      environmentType: raw.environmentType,
      adoptionRequirements: raw.adoptionRequirements,
      size: raw.size,
      adopted: raw.adopted,
      orgId: raw.orgId,
      orgAddressId: raw.orgAddressId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      petImages: raw.pet_images.map(PresenterPetImageMapper.toHTTP),
    }

    return pet
  }
}
