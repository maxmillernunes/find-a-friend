import type { Org, Prisma } from '@/prisma-client'
import type { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findManyNearby({
    latitude,
    longitude,
    page,
    pageSize,
  }: FindManyNearbyParams): Promise<Org[]> {
    const orgs = await prisma.$queryRaw<Org[]>`
      SELECT
        o.id,
        o.owner,
        o.org_name as orgName,
        o.email,
        o.phone,
        o.created_at as createdAt,
        o.updated_at as updatedAt
      FROM
        orgs AS o
      INNER JOIN org_address oa ON o.id = oa.org_id
      WHERE (6371 * acos(
          cos(radians(${latitude})) * cos(radians(oa.latitude)) *
          cos(radians(oa.longitude) - radians(${longitude})) +
          sin(radians(${latitude})) * sin(radians(oa.latitude))
        )
      ) <= 10
      LIMIT ${pageSize ?? 20} OFFSET ${(page - 1) * (pageSize ?? 20)}
    `
    // Note: The above query uses raw SQL to calculate the distance using the Haversine formula.
    return orgs
  }
}
