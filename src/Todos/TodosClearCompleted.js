import React from "react";
import { TodosContext } from "./Todos";

function TodosClearCompleted() {
  const { todos, setTodos, deleteTodo } = React.useContext(TodosContext);

  function onClearCompleted() {
    setTodos(todos.filter(t => !t.completed));
    todos.forEach(todo => todo.completed && deleteTodo(todo.id));
  }

  return (
    <button className="clear-completed" onClick={onClearCompleted}>
      Clear completed
    </button>
  );
}

export default TodosClearCompleted;
