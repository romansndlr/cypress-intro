import React from 'react'

import Todos from './Todos'

function App() {
  return (
    <Todos>
      <Todos.Header>
        <Todos.Add />
      </Todos.Header>
      <Todos.Main>
        <Todos.ToggleAll />
        <Todos.List />
      </Todos.Main>
      <Todos.Footer>
        <Todos.Count />
        <Todos.Filters />
        <Todos.ClearCompleted />
      </Todos.Footer>
    </Todos>
  )
}

export default App
