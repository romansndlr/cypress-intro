import React from 'react'
import { TodosContext } from './Todos'
import produce from 'immer'

function TodosEdit({ todo }) {
  const editTodoInputRef = React.useRef()
  const { todos, setTodos, editing, updateTodo, setEditing } = React.useContext(TodosContext)

  const onClickOutsideEdit = React.useCallback(
    (e) => {
      if (!editTodoInputRef.current) return
      const updatedTodo = todos.find(({ id }) => editing.id === id)
      if (!editTodoInputRef.current.contains(e.target)) {
        updateTodo(updatedTodo)
        setEditing({})
      }
    },
    [todos, editing, updateTodo, setEditing]
  )

  function onChange(id, title) {
    setTodos(
      produce(todos, (draftTodos) => {
        draftTodos.forEach((todo) => {
          if (todo.id !== id) return
          todo.title = title
        })
      })
    )
  }

  function onEditSubmit(e) {
    if (e.key === 'Enter') {
      const updatedTodo = todos.find(({ id }) => editing.id === id)
      updateTodo(updatedTodo)
      setEditing({})
    }
  }

  React.useEffect(() => {
    editTodoInputRef.current && editTodoInputRef.current.focus()
  }, [editing])

  React.useEffect(() => {
    document.addEventListener('mousedown', onClickOutsideEdit)
    return () => document.removeEventListener('mousedown', onClickOutsideEdit)
  }, [onClickOutsideEdit])

  return (
    <input
      aria-label="Todo edit"
      ref={editTodoInputRef}
      onChange={(e) => onChange(todo.id, e.target.value)}
      onKeyPress={onEditSubmit}
      value={todo.title}
      className="edit"
      type="text"
    />
  )
}

export default TodosEdit
