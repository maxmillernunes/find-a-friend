import { promises } from 'node:fs'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import { basename, extname, resolve } from 'node:path'

import storage from '@/config/storage'
import type { StorageProvider, StorageSaveParams } from '../storage'
import { pipeline } from 'node:stream/promises'

export class LocalStorageProvider implements StorageProvider {
  /**
   * Sanitize file name to avoid special characters
   * @param fileName
   * @returns fileName without special characters plus a unique identifier
   */
  private sanitizeFileName(fileName: string) {
    const ext = extname(fileName)
    const baseName = basename(fileName, ext)
    const sanitizedBaseName = baseName
      .replace(/[^a-zA-Z0-9]/g, '')
      .concat(randomUUID())

    return sanitizedBaseName.concat(ext)
  }

  /**
   * Sanitize path folder and create the folder if it doesn't exist
   * @param fileName
   * @param folder
   * @returns full path to the file
   */
  private async sanitizePathFolder(fileName: string, folder: string) {
    const path = resolve(`${storage.tempFolder}/${folder}`, fileName)
    const folderPath = resolve(`${storage.tempFolder}/${folder}`)

    await promises.mkdir(folderPath, {
      recursive: true,
    })

    return path
  }

  /**
   * Save file to local storage
   * @param file
   * @param content
   * @param mineType -> Only local storage
   * @param folder
   * @returns filename
   */
  async save({ file, content, folder }: StorageSaveParams): Promise<string> {
    const fileName = this.sanitizeFileName(file)
    const path = await this.sanitizePathFolder(fileName, folder)

    await pipeline(content, fs.createWriteStream(path))

    return fileName
  }

  /**
   * Delete file from local storage
   * @param file
   * @param folder
   * @returns void
   */
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${storage.tempFolder}/${folder}`, file)

    try {
      await promises.stat(filename)
    } catch {
      return
    }

    await promises.unlink(filename)
  }
}
