import React from "react";
import TodosList from "./TodosList";
import TodosAdd from "./TodosAdd";
import TodosToggleAll from "./TodosToggleAll";
import TodosFilters from "./TodosFilters";
import TodosClearCompleted from "./TodosClearCompleted";
import TodosCount from "./TodosCount";
import TodosToggle from "./TodosToggle";
import TodosMain from "./TodosMain";
import TodosFooter from "./TodosFooter";
import TodosHeader from "./TodosHeader";

export const TodosContext = React.createContext();

function Todos({ children }) {
  const [filter, setFilter] = React.useState("all");
  const [editing, setEditing] = React.useState({});
  const [todos, setTodos] = React.useState([]);

  async function getToods() {
    const data = await fetch("/api/todos").then(res => res.json());
    setTodos(data);
  }

  async function updateTodo(todo) {
    return await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify(todo)
    });
  }

  async function deleteTodo(id) {
    return await fetch(`/api/todos/${id}`, {
      method: "DELETE"
    });
  }

  React.useEffect(() => {
    getToods();
  }, []);

  const value = React.useMemo(
    () => ({
      filter,
      setFilter,
      editing,
      setEditing,
      todos,
      setTodos,
      updateTodo,
      deleteTodo
    }),
    [filter, editing, todos]
  );

  return (
    <TodosContext.Provider value={value}>
      <main>
        <section className="todoapp">{children}</section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href="http://twitter.com/RomanSndlr">Roman Snadler</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </main>
    </TodosContext.Provider>
  );
}

Todos.List = TodosList;
Todos.Toggle = TodosToggle;
Todos.Add = TodosAdd;
Todos.ToggleAll = TodosToggleAll;
Todos.Filters = TodosFilters;
Todos.Count = TodosCount;
Todos.ClearCompleted = TodosClearCompleted;
Todos.Main = TodosMain;
Todos.Footer = TodosFooter;
Todos.Header = TodosHeader;

export default Todos;
