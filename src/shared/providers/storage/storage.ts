import type { Readable } from 'node:stream'

export interface StorageSaveParams {
  file: string
  content: Readable
  mineType?: string // Only local storage
  folder: string
}

interface StorageProvider {
  save(param: StorageSaveParams): Promise<string>
  delete(file: string, folder: string): Promise<void>
}

export { StorageProvider }
