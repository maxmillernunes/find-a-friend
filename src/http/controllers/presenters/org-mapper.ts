import type { Org } from '@/prisma-client'

export class PresenterOrgMapper {
  static toHTTP(raw: Org) {
    const org = {
      id: raw.id,
      owner: raw.owner,
      orgName: raw.orgName,
      email: raw.email,
      phone: raw.phone,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }

    return org
  }
}
