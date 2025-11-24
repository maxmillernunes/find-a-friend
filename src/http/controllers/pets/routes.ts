import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetch } from './fetch'
import { getPetById } from './get-pet-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      onRequest: [verifyJWT],
    },
    create
  )

  app.get('/pets', fetch)
  app.get('/pets/:petId', getPetById)
}
