import { makeFetchPetsUseCase } from '@/use-case/factories/make-fetch-pet-use-case'
import {
  LevelEnergy,
  LevelIndependency,
  PetAge,
  PetSize,
} from '@/prisma-client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  PresenterFetchPetMapper,
  type PrismaFetchPetWithRelations,
} from '../presenters/fetch-pet.presenter'

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

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const results = await fetchPetsUseCase.execute({
    city,
    age,
    levelEnergy,
    levelIndependency,
    size,
  })

  const pets = results.pets.map((pet) => {
    return PresenterFetchPetMapper.toHTTP(
      pet as unknown as PrismaFetchPetWithRelations
    )
  })

  return reply.status(200).send(pets)
}
