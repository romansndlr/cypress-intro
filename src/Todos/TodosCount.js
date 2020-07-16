import React from "react";
import { TodosContext } from "./Todos";

function TodosCount() {
  const { todos } = React.useContext(TodosContext);
  return <span className="todo-count">{todos.length}</span>;
}

export default TodosCount;
