import React from "react";
import { TodosContext } from "./Todos";
import produce from "immer";

function TodosToggleAll() {
  const { todos, setTodos, updateTodo } = React.useContext(TodosContext);
  const anyNotCompleted = todos.some(todo => !todo.completed);

  function onToggleAll() {
    setTodos(
      produce(todos, draftTodos => {
        draftTodos.forEach(todo => {
          todo.completed = anyNotCompleted;
          updateTodo(todo);
        });
      })
    );
  }

  return (
    <React.Fragment>
      <input
        id="toggle-all"
        onChange={onToggleAll}
        className="toggle-all"
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  );
}

export default TodosToggleAll;
