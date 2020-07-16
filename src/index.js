import React from 'react'
import ReactDOM from 'react-dom'
import { Server, Response } from 'miragejs'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './server.js'
import { makeServer } from './server.js'

if (window.Cypress) {
  new Server({
    environment: 'test',
    routes() {
      let methods = ['get', 'put', 'patch', 'post', 'delete']
      methods.forEach((method) => {
        this[method]('/*', async (schema, request) => {
          let [status, headers, body] = await window.handleFromCypress(request)
          return new Response(status, headers, body)
        })
      })
    },
  })
} else {
  makeServer()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
