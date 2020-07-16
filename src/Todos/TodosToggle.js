import React from 'react'
import { TodosContext } from './Todos'
import produce from 'immer'

function TodosToggle({ todo }) {
  const { todos, setTodos, updateTodo } = React.useContext(TodosContext)

  function onToggle({ id, completed }) {
    setTodos(
      produce(todos, (draftTodos) => {
        draftTodos.forEach((todo) => {
          if (id !== todo.id) return
          todo.completed = !completed
          updateTodo(todo)
        })
      })
    )
  }

  return (
    <input
      aria-label="Todo checked toggle"
      className="toggle"
      type="checkbox"
      onChange={() => onToggle(todo)}
      checked={todo.completed}
    />
  )
}

export default TodosToggle
