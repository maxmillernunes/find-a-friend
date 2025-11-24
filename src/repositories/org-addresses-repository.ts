import type { Prisma } from '@/prisma-client'

export interface OrgAddressesRepository {
  create(data: Prisma.OrgAddressUncheckedCreateInput): Promise<void>
}
