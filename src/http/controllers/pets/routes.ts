import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      onRequest: [verifyJWT],
    },
    create
  )

  app.get('/pets', fetch)
}
