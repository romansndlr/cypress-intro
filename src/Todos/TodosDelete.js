import React from 'react'
import { TodosContext } from './Todos'

function TodosDelete({ todo }) {
  const { todos, setTodos, deleteTodo } = React.useContext(TodosContext)

  function onDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id))

    deleteTodo(id)
  }

  return <button data-test-id="delete-todo" onClick={() => onDelete(todo.id)} className="destroy" />
}

export default TodosDelete
