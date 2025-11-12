import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org'

export function makeAuthenticateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const authenticateOrgUseCase = new AuthenticateOrgUseCase(
    prismaOrgsRepository
  )

  return authenticateOrgUseCase
}
