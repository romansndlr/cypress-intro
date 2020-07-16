import React from 'react'
import classNames from 'classnames'
import { TodosContext } from './Todos'
import TodosToggle from './TodosToggle'
import TodosDelete from './TodosDelete'
import TodosEdit from './TodosEdit'

function TodosList() {
  const { filter, editing, setEditing, todos } = React.useContext(TodosContext)

  return (
    <ul className="todo-list" aria-label="Todos">
      {todos
        .filter((todo) => {
          switch (filter) {
            case 'all':
              return true
            case 'active':
              return !todo.completed
            case 'completed':
              return todo.completed
            default:
              return false
          }
        })
        .map((todo) => (
          <li
            onDoubleClick={() => {
              setEditing(todo)
            }}
            key={todo.id}
            className={classNames('todo', {
              completed: todo.completed,
              editing: todo.id && editing.id === todo.id,
            })}
            aria-label={todo.title}
          >
            <div className="view">
              <TodosToggle todo={todo} />
              <label>{todo.title}</label>
              <TodosDelete todo={todo} />
            </div>
            {editing.id === todo.id && <TodosEdit todo={todo} />}
          </li>
        ))}
    </ul>
  )
}

export default TodosList
