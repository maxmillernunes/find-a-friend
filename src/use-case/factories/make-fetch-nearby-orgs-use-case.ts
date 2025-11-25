import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchNearbyOrgsUseCase } from '../fetch-nearby-orgs'

export function makeFetchNearbyOrgsUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()

  const fetchNearbyOrgsUseCase = new FetchNearbyOrgsUseCase(
    prismaOrgsRepository
  )

  return fetchNearbyOrgsUseCase
}
