import { makeServer } from '../../src/server'

let server

beforeEach(() => {
  server = makeServer({ env: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('should add a todo', () => {})

it('should load the todos from the server', () => {})

it('should edit a todo', () => {})

it('should mark a todo as checked', () => {})

it('should mark a todo as unchecked', () => {})

it('should delete a todo', () => {})

it('should clear completed', () => {})

it('should filter the todos according to "Active" filter', () => {})

it('should filter the todos according to "Completed" filter', () => {})

it('should filter the todos according to "All" filter', () => {})
