'use strict'

require('dotenv').config()

const Hapi = require('@hapi/hapi')
const ClientError = require('./exceptions/ClientError')

// Activity
const activities = require('./api/activities')
const ActivitiesService = require('./services/ActivitiesService')
const ActivitiesValidator = require('./validator/activities')

// Todos
const todos = require('./api/todos')
const TodosService = require('./services/TodosService')
const TodosValidator = require('./validator/todos')

const init = async () => {
  const activitiesService = new ActivitiesService()
  const todosService = new TodosService()

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  await server.register([
    {
      plugin: activities,
      options: {
        service: activitiesService,
        validator: ActivitiesValidator,
      },
    },
    {
      plugin: todos,
      options: {
        service: todosService,
        validator: TodosValidator,
      },
    },
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        })
        newResponse.code(response.statusCode)
        return newResponse
      }

      if (!response.isServer) {
        return h.continue
      }

      const newResponse = h.response({
        status: 'error',
        message: 'Maaf,terjadi kegagalan pada server kami',
      })
      newResponse.code(500)
      return newResponse
    }
    return h.continue
  })

  await server.start()
  console.log(`Server running on ${server.info.uri}`)

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })
}

init()
