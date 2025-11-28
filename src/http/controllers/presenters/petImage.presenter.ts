import { env } from '@/env'
import type { PetImages } from '@/prisma-client'

export class PresenterPetImageMapper {
  static toHTTP(raw: PetImages) {
    const org = {
      id: raw.id,
      petId: raw.petId,
      url: `${env.URL_IMAGES}/${raw.fileName}`,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }

    return org
  }
}
