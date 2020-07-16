import { Server, Model, RestSerializer } from 'miragejs'

export function makeServer({ env } = { env: 'development' }) {
  return new Server({
    models: {
      todo: Model,
    },

    environment: env,

    serializers: {
      application: RestSerializer.extend({
        root: false,
        embed: true,
        normalize: (json) => ({
          data: {
            attributes: json,
          },
        }),
      }),
    },

    routes() {
      this.namespace = 'api'

      this.resource('todos')

      this.passthrough()
    },

    seeds(server) {
      server.create('todo', { title: 'Buy Milk', completed: false })
      server.create('todo', { title: 'Do Homework', completed: true })
      server.create('todo', { title: 'Clean House', completed: false })
    },
  })
}
