import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import z, { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      error: z.treeifyError(error),
    })
  }

  if (env.NODE_ENV === 'dev') {
    console.log(error)
  } else {
    // Mandaria para open telemetry da vida
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
