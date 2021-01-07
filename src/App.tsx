import React, { useState } from 'react';
import './css/style.css'
import TodoForm from './components/todo-form';
import TodoList from './components/todo-list';
import { TodoInterface, TodoItemInterface } from './modal/interface';
import Footer from './components/footer';

function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([])
  const [checkAllActive, setcheckAllActive] = useState(true);
  const [filter, setFilter] = useState(0)


  const handleTodoCreate = (todo: TodoInterface) => {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.push(todo)
    console.log("NEW todostate: ", newTodosState)
    setTodos(newTodosState)
  }

  const handleTodoUpdate = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value
    setTodos(newTodosState)
  }

  const handleTodoRemove = (id: string) => {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)
    setTodos(newTodosState)
  }

  const handleTodoComplete = (id: string) => {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted
      = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted
    setTodos(newTodosState)
  }

  const handleTodoBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
  }

  const checkAllTodos = () => {
    todos.forEach(todo => {
      todo.isCompleted = checkAllActive
    })
    setcheckAllActive(!checkAllActive)
  }

  const filterTodos = () => {
    switch (filter) {
      case 0:
        return todos
      case 1:
        return todos.filter(todo => todo.isCompleted === false)
      case 2:
        return todos.filter(todo => todo.isCompleted === true)
      default:
        return todos
    }
  }

  const handleTodoFilter = (filter: number) => {
    setFilter(filter)
  }

  return (
    <div className="todo-list-app">
      <h1>Todo List</h1>
      <TodoForm
        handleTodoBlur={handleTodoBlur}
        checkAllTodos={checkAllTodos}
        handleTodoCreate={handleTodoCreate}
      />

      <TodoList
        todos={filterTodos()}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
        handleTodoBlur={handleTodoBlur}
      />

      <Footer
        handleTodoFilter={handleTodoFilter}
      />
    </div>
  );
}

export default App;
