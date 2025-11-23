import type { Prisma } from '@prisma-client'
import type { OrgAddressesRepository } from '../org-addresses-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgAddressesRepository implements OrgAddressesRepository {
  async create(data: Prisma.OrgAddressUncheckedCreateInput): Promise<void> {
    await prisma.orgAddress.create({ data })
  }
}
