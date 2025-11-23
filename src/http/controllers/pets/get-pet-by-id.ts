import { makeGetPetByIdUseCase } from '@/use-case/factories/make-get-pet-by-id-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    petId: z.uuid(),
  })

  const { petId } = querySchema.parse(request.params)

  const getPetByIdUseCase = makeGetPetByIdUseCase()

  const pet = await getPetByIdUseCase.execute({ petId })

  return reply.status(200).send(pet)
}
