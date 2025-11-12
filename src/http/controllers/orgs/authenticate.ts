import z from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateOrgUseCase } from '@/use-case/factories/make-authenticate-org-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const orgSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  })

  const { email, password } = orgSchema.parse(request.body)

  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  const { org } = await authenticateOrgUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign({}, { sign: { sub: org.id } })

  return reply.status(200).send({
    token,
  })
}
