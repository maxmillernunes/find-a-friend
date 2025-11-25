import { makeCreateOrgUseCase } from '@/use-case/factories/make-create-org-use-case'
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
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    }),
  })

  const data = createOrgSchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  await createOrgUseCase.execute(data)

  return reply.status(201).send()
}
