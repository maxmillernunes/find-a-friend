import type { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgWrongCredentialsError } from './errors/org-wrong-credentials-error'
import { compare } from 'bcryptjs'
import type { Org } from '@prisma/client'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new OrgWrongCredentialsError()
    }

    const isPasswordDoesMatch = await compare(password, org.password)

    if (!isPasswordDoesMatch) {
      throw new OrgWrongCredentialsError()
    }

    return { org }
  }
}
