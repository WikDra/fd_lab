// TodoApp.jsx
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  // Stan przechowujący listę zadań
  const [tasks, setTasks] = useState([]);

  // Funkcja dodająca nowe zadanie do listy
  const addTask = (task) => {
    if tasks.filter((task) => tasks.task = task){
        setTasks([...tasks, task]);
    }
    
  };

  // Funkcja usuwająca zadanie z listy
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h1>To-Do List</h1>
      <TodoForm addTask={addTask} />
      <TodoList tasks={tasks} removeTask={removeTask} />
    </div>
  );
};

export default TodoApp;
