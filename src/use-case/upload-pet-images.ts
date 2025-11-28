import { PetsRepository } from '@/repositories/pets-repository'
import { PetDoesNotExistsError } from './errors/pet-does-not-exists-error'
import { PetImagesRepository } from '@/repositories/pet-images-repository'
import { StorageProvider } from '@/shared/providers/storage/storage'
import storage from '@/config/storage'
import type { Multipart } from '@fastify/multipart'

interface CreatePetUseCaseRequest {
  petId: string
  content: AsyncIterableIterator<Multipart>
}

export class UploadPetImagesUseCase {
  constructor(
    private petImagesRepository: PetImagesRepository,
    private petsRepository: PetsRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({ content, petId }: CreatePetUseCaseRequest): Promise<void> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetDoesNotExistsError()
    }

    const filesNames: string[] = []

    for await (const part of content) {
      if (part.type !== 'file' || !part.file) {
        continue
      }

      const fileName = await this.storageProvider.save({
        content: part.file,
        file: part.filename,
        mineType: part.mimetype,
        folder: storage.petImagesFolder,
      })

      filesNames.push(fileName)
    }

    for (const fileName of filesNames) {
      await this.petImagesRepository.create({
        fileName,
        petId,
      })
    }
  }
}
