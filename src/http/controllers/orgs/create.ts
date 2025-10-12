import { CreateOrgUseCase } from '@/use-case/create-org'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    owner: z.string(),
    orgName: z.string(),
    email: z.email(),
    password: z.string().min(8),
    phone: z.string(),
    address: z.object({
      street: z.string(),
      number: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      cep: z.string(),
      complement: z.string().optional(),
    }),
  })

  const data = createOrgSchema.parse(request.body)

  const createOrgUseCase = new CreateOrgUseCase()
  await createOrgUseCase.execute(data)

  return reply.status(201).send()
}
