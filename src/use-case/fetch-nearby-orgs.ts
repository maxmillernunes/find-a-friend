import type { Org } from '@/prisma-client'
import type { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface FetchNearbyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page,
    })

    return { orgs }
  }
}
