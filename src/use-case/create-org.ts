import { prisma } from '@/lib/prisma'
import type { Org } from '@prisma/client'

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
    complement?: string
  }
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor() {}

  async execute({
    owner,
    orgName,
    email,
    password,
    phone,
    address,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await prisma.org.findMany()

    console.log({ org })

    console.log({
      owner,
      orgName,
      email,
      password,
      phone,
      address,
    })

    return {} as unknown as CreateOrgUseCaseResponse
  }
}
