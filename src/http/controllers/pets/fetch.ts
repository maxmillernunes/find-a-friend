import { makeFetchPetsUseCase } from '@/use-case/factories/make-fetch-pet-use-case'
import { LevelEnergy, LevelIndependency, PetAge, PetSize } from '@prisma-client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    city: z.string(),
    age: z.enum(PetAge).optional(),
    levelEnergy: z.enum(LevelEnergy).optional(),
    size: z.enum(PetSize).optional(),
    levelIndependency: z.enum(LevelIndependency).optional(),
  })

  const { city, age, levelEnergy, levelIndependency, size } = querySchema.parse(
    request.query
  )

  const createPetUseCase = makeFetchPetsUseCase()

  const pets = await createPetUseCase.execute({
    city,
    age,
    levelEnergy,
    levelIndependency,
    size,
  })

  return reply.status(200).send(pets)
}
