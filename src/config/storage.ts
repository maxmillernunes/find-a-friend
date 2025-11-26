import { resolve } from 'path'

const tempFolder = resolve(__dirname, '..', '..', 'tmp')
const resolvePetImagePath = resolve(tempFolder, 'pet-images')

interface StorageConfig {
  tempFolder: string
  petImagesFolder: string
  resolvePetImagePath: string
}

export default {
  tempFolder,
  petImagesFolder: 'pet-images',
  resolvePetImagePath,
} as StorageConfig
