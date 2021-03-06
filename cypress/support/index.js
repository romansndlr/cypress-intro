import './commands'
import { configure } from '@testing-library/cypress'

configure({ testIdAttribute: 'data-test-id' })

Cypress.on('window:before:load', (win) => {
  win.handleFromCypress = function (request) {
    return fetch(request.url, {
      method: request.method,
      headers: request.requestHeaders,
      body: request.requestBody,
    }).then((res) => {
      let content =
        res.headers.map['content-type'] === 'application/json'
          ? res.json()
          : res.text()
      return new Promise((resolve) => {
        content.then((body) => resolve([res.status, res.headers, body]))
      })
    })
  }
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
