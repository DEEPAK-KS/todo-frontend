import React, { useState } from "react";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleUpdate = () => {
    updateTask(task._id, newText);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
      ) : (
        <span>{task.text}</span>
      )}
      {isEditing ? (
        <button className="edit-btn" onClick={handleUpdate}>Save</button>
      ) : (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;

