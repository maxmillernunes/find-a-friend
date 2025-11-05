import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'
import { PrismaOrgAddressesRepository } from '@/repositories/prisma/prisma-org-addresses-repository'

export function makeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const prismaOrgAddressesRepository = new PrismaOrgAddressesRepository()
  const createOrgUseCase = new CreateOrgUseCase(
    prismaOrgsRepository,
    prismaOrgAddressesRepository
  )

  return createOrgUseCase
}
