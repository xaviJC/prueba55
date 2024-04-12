import React from 'react';


const Task = ({
    task,
    deleteTask,
    toggleTaskCompletion,
    startEditTask,
    saveEditedTask,
    isEditing,
    editedTaskText,
    setEditedTaskText
  }) => {
    const handleEditChange = (e) => {
      setEditedTaskText(e.target.value);
    };
  
    const handleSaveClick = () => {
      saveEditedTask(task.id);
    };
  
    return (
      <li className={task.completed ? 'completed' : ''}>
        {!isEditing ? (
          <>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button onClick={() => startEditTask(task.id, task.text)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </>
        ) : (
          <>
            <input type="text" value={editedTaskText} onChange={handleEditChange} />
            <button onClick={handleSaveClick}>Save</button>
          </>
        )}
      </li>
    );
  };
export default Task;