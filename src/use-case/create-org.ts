import { hash } from 'bcryptjs'
import type { Org } from '@/prisma-client'
import type { OrgsRepository } from '@/repositories/orgs-repository'
import { PASSWORD_ROUNDS } from '@/shared/utils/constants'
import type { OrgAddressesRepository } from '@/repositories/org-addresses-repository'
import { OrgWithEmailAlreadyExistsError } from './errors/org-with-email-already-exists-error'

interface CreateOrgUseCaseRequest {
  owner: string
  orgName: string
  email: string
  password: string
  phone: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    cep: string
    latitude: number
    longitude: number
    complement?: string
  }
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private orgAddressesRepository: OrgAddressesRepository
  ) {}

  async execute({
    owner,
    orgName,
    email,
    password,
    phone,
    address,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (
      userWithSameEmail &&
      userWithSameEmail.orgName.toLowerCase() === orgName.toLowerCase()
    ) {
      throw new OrgWithEmailAlreadyExistsError()
    }

    if (userWithSameEmail) {
      throw new OrgWithEmailAlreadyExistsError()
    }

    const passwordHash = await hash(password, PASSWORD_ROUNDS)

    const org = await this.orgsRepository.create({
      owner,
      orgName,
      email,
      password: passwordHash,
      phone,
    })

    const {
      cep,
      city,
      neighborhood,
      number,
      state,
      street,
      complement,
      latitude,
      longitude,
    } = address

    await this.orgAddressesRepository.create({
      cep,
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
      latitude,
      longitude,
      orgId: org.id,
    })

    return { org }
  }
}
