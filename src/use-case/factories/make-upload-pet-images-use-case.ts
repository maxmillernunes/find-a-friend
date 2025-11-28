import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { LocalStorageProvider } from '@/shared/providers/storage/implementations/local-storage'
import { UploadPetImagesUseCase } from '../upload-pet-images'
import { PrismaPetImagesRepository } from '@/repositories/prisma/prisma-pet-images-repository'

export function makeUploadPetImagesUseCase() {
  const petImagesRepository = new PrismaPetImagesRepository()
  const petsRepository = new PrismaPetsRepository()
  const storageProvider = new LocalStorageProvider()

  const uploadPetImagesUseCase = new UploadPetImagesUseCase(
    petImagesRepository,
    petsRepository,
    storageProvider
  )

  return uploadPetImagesUseCase
}
