import React from "react";

function TodosHeader({ children }) {
  return (
    <header className="header">
      <h1>todos</h1>
      {children}
    </header>
  );
}

export default TodosHeader;
