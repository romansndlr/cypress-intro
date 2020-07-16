import React from "react";
import { TodosContext } from "./Todos";
import produce from "immer";
import uuid from "uuid/v4";

function TodosAdd() {
  const { todos, setTodos } = React.useContext(TodosContext);
  const addTodoInputRef = React.useRef();

  async function createTodo(todo) {
    const newTodo = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo)
    }).then(res => res.json());
    setTodos(
      produce(todos, draftTodos => {
        // This will run before the newTodo with the uuid has been added
        draftTodos.push(newTodo);
      })
    );
  }

  async function onKeyDown(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      const title = e.target.value;
      const todo = { title, completed: false };
      setTodos(
        produce(todos, draftTodos => {
          // We set a temp uuid on the new todo to be used as a key by react
          draftTodos.push({ id: uuid(), ...todo });
        })
      );
      createTodo(todo);
      addTodoInputRef.current.value = "";
    }
  }

  return (
    <input
      ref={addTodoInputRef}
      onKeyDown={onKeyDown}
      className="new-todo"
      placeholder="What needs to be done?"
    />
  );
}

export default TodosAdd;
