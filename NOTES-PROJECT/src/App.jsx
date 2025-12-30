import React from 'react'
import Navbar from './Navbar'
import FormContainer from './FormContainer'
import TodoList from './TodoList'
import TaskContext from './context/TaskContext'

const App = () => {
  return (
    <>
      <Navbar />
      <TaskContext>
        <main className="mainContainer">
          <FormContainer />{/*props-children*/}
          <TodoList /> {/*props-children*/}
        </main>
      </TaskContext>
    </>
  );
}

export default App