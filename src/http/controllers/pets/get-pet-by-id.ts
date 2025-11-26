import { makeGetPetByIdUseCase } from '@/use-case/factories/make-get-pet-by-id-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  PresenterPetDetailsMapper,
  type PrismaPetDetailsWithRelations,
} from '../presenters/pet-details-mapper'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    petId: z.uuid(),
  })

  const { petId } = querySchema.parse(request.params)

  const getPetByIdUseCase = makeGetPetByIdUseCase()

  const result = await getPetByIdUseCase.execute({ petId })

  const pet = PresenterPetDetailsMapper.toDomain(
    result.pet as unknown as PrismaPetDetailsWithRelations
  )

  return reply.status(200).send(pet)
}
