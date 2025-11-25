import type { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'
import { nearby } from './nearby'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/authenticate', authenticate)

  app.get('/orgs/nearby', nearby)
}
