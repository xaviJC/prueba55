import React, { useState, useEffect } from 'react';
import './App.css';
import Task from './Components/Task';
import DeletedTasks from './Components/DeletedTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const deletedTask = tasks.find(task => task.id === taskId);
    setDeletedTasks([...deletedTasks, deletedTask]);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const startEditTask = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const saveEditedTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, text: editedTaskText };
      }
      return task;
    }));
    setEditTaskId(null);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
            startEditTask={startEditTask}
            saveEditedTask={saveEditedTask}
            isEditing={editTaskId === task.id}
            editedTaskText={editedTaskText}
            setEditedTaskText={setEditedTaskText}
          />
        ))}
      </ul>
      {deletedTasks.length > 0 && (
        <DeletedTasks deletedTasks={deletedTasks} />
      )}
    </div>
  );
};


export default App;
