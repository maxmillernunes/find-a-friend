import type { Pet, Prisma } from '@/prisma-client'
import { PresenterOrgMapper } from './org-mapper'
import { PresenterPetImageMapper } from './petImage-mapper'
import { PresenterOrgAddressMapper } from './org-address-mapper'

export type PrismaPetDetailsWithRelations = Pet &
  Prisma.PetGetPayload<{
    include: {
      org: true
      pet_images: true
      org_address: true
    }
  }>

export class PresenterPetDetailsMapper {
  static toDomain(raw: PrismaPetDetailsWithRelations) {
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
      org: PresenterOrgMapper.toDomain(raw.org),
      petImages: raw.pet_images.map(PresenterPetImageMapper.toDomain),
      orgAddress: PresenterOrgAddressMapper.toDomain(raw.org_address),
    }

    return pet
  }
}
