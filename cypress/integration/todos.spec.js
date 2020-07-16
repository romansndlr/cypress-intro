import { makeServer } from '../../src/server'

const TODO_CHECKED_TOGGLE_LABEL = /Todo checked toggle/i
const TODO_ADD_INPUT_PLACEHOLDER = /What needs to be done?/i
const TODOS_LIST_LABEL = /Todos/i
const TODO_EDIT_INPUT_LABEL = /Todo edit/i
const CLEAR_COMPLETED_NAME = /Clear completed/i

let server

beforeEach(() => {
  server = makeServer({ env: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('should add a todo', () => {
  // Arrange
  cy.visit('/')

  // Act
  const newTodo = 'Test with confidence!'
  cy.findByPlaceholderText(TODO_ADD_INPUT_PLACEHOLDER).type(`${newTodo}{enter}`)

  // Assert
  cy.findByRole('listitem', { name: newTodo }).should('exist')
})

it('should load the todos from the server', () => {
  // Arrange
  const buyMilkTodo = server.create('todo', { title: 'Buy milk', completed: true })
  const doHomeworkTodo = server.create('todo', { title: 'Do homework', completed: false })

  // Act
  cy.visit('/')

  // Assert
  cy.findByRole('list', { name: TODOS_LIST_LABEL }).within(() => {
    cy.root().children().should('have.length', 2)

    cy.findByRole('listitem', { name: buyMilkTodo.title })
      .should('exist')
      .within(() => {
        cy.findByLabelText(TODO_CHECKED_TOGGLE_LABEL).should('be.checked')
      })

    cy.findByRole('listitem', { name: doHomeworkTodo.title })
      .should('exist')
      .within(() => {
        cy.findByLabelText(TODO_CHECKED_TOGGLE_LABEL).should('not.be.checked')
      })
  })
})

it('should edit a todo', () => {
  // Arrange
  const buyMilkTodo = server.create('todo', { title: 'Buy Milk', completed: false })
  cy.visit('/')

  // Act
  const buyJuiceTodoTitle = 'Buy Juice'
  cy.findByRole('listitem', { name: buyMilkTodo.title }).dblclick()
  cy.findByLabelText(TODO_EDIT_INPUT_LABEL).clear().type(`${buyJuiceTodoTitle}{enter}`)

  // Assert
  cy.findByRole('listitem', { name: buyJuiceTodoTitle }).should('exist')
  cy.findByRole('listitem', { name: buyMilkTodo.title }).should('not.exist')
})

it('should mark a todo as checked', () => {
  // Arrange
  const buyMilkTodo = server.create('todo', { title: 'Buy Milk', completed: false })
  cy.visit('/')

  // Act
  cy.findByRole('listitem', { name: buyMilkTodo.title }).within(() => {
    cy.findByLabelText(TODO_CHECKED_TOGGLE_LABEL).as('toggledTodo').check()
  })

  // Assert
  cy.get('@toggledTodo').should('be.checked')
})

it('should mark a todo as unchecked', () => {
  // Arrange
  const buyMilkTodo = server.create('todo', { title: 'Buy Milk', completed: true })
  cy.visit('/')

  // Act
  cy.findByRole('listitem', { name: buyMilkTodo.title }).within(() => {
    cy.findByLabelText(TODO_CHECKED_TOGGLE_LABEL).as('toggledTodo').uncheck()
  })

  // Assert
  cy.get('@toggledTodo').should('not.be.checked')
})

it('should delete a todo', () => {
  // Arrange
  const buyMilkTodo = server.create('todo', { title: 'Buy milk', completed: true })
  const doHomeworkTodo = server.create('todo', { title: 'Do homework', completed: false })
  cy.visit('/')

  // Act
  cy.findByRole('listitem', { name: buyMilkTodo.title })
    .as('deletedTodo')
    .within(() => {
      cy.findByTestId('delete-todo').invoke('show').click()
    })

  // Assert
  cy.findByRole('list', { name: TODOS_LIST_LABEL }).within(() => {
    cy.root().children().should('have.length', 1)

    cy.findByRole('listitem', { name: doHomeworkTodo.title }).should('exist')
    cy.get('@deletedTodo').should('not.exist')
  })
})

it('should clear completed', () => {
  // Arrange
  const buyMilkTodo = server.create('todo', { title: 'Buy milk', completed: true })
  const doHomeworkTodo = server.create('todo', { title: 'Do homework', completed: false })
  cy.visit('/')

  // Act
  cy.findByRole('list', { name: TODOS_LIST_LABEL }).as('todosList').children().should('have.length', 2)
  cy.findByRole('button', { name: CLEAR_COMPLETED_NAME }).click()

  // Assert
  cy.get('@todosList').within(() => {
    cy.root().children().should('have.length', 1)

    cy.findByRole('listitem', { name: buyMilkTodo.title }).should('not.exist')
    cy.findByRole('listitem', { name: doHomeworkTodo.title }).should('exist')
  })
})
