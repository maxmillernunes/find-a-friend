import type { OrgAddress } from '@/prisma-client'

export class PresenterOrgAddressMapper {
  static toHTTP(raw: OrgAddress) {
    const orgAddress = {
      id: raw.id,
      street: raw.street,
      number: raw.number,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      zipCode: raw.cep,
      latitude: raw.latitude,
      longitude: raw.longitude,
      orgId: raw.orgId,
    }

    return orgAddress
  }
}
