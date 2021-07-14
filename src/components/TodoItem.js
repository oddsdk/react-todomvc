import React, { useState } from "react";

export default function TodoItem({ todo, onUpdate}) {
  const [editing, setEditing] = useState(false);

  const onCompletion = async () => {
    onUpdate({detail: {type: 'toggleCompletion', id: todo.id}})
  }

  // TODOS
  const onChange = () => {}
  const onDelete = () => {}
  const handleViewClick = () => {}
  const onEnter = () => {
    // update editing state
  }

  return (
    <li
      onClick={handleViewClick}
      className={`${editing ? "editing" : ""} ${todo.completed ? "completed" : ""}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={onCompletion}
          autoFocus={true}
        />
        <label>{todo.title}</label>
        <button className="destroy" onClick={onDelete} />
      </div>
      {editing && (
        <input
          className="edit"
          value={todo.label}
          onChange={onChange}
          onKeyPress={onEnter}
        />
      )}
    </li>
  );
}
