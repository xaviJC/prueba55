import React from 'react';

const DeletedTasks = ({ deletedTasks }) => {
  return (
    <div className="deleted-tasks">
      <h2>Deleted Tasks</h2>
      <ul>
        {deletedTasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeletedTasks;