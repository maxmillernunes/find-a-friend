import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetch } from './fetch'
import { getPetById } from './get-pet-by-id'
import { upload } from './upload'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      onRequest: [verifyJWT],
    },
    create
  )
  app.post(
    '/pets/:petId/files',
    {
      onRequest: [verifyJWT],
    },
    upload
  )

  app.get('/pets', fetch)
  app.get('/pets/:petId', getPetById)
}
