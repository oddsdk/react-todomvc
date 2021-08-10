import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';

import { useAuth } from '../hooks/useAuth';
import { useFilesystem } from '../hooks/useFilesystem';
import TodoItem from "./TodoItem";


export default function TodoList() {
  const { fs } = useAuth();

  const [todos, dispatch] = useFilesystem(fs);
  const [newTodo, setNewTodo] = useState('');

  const onNewValue = event => {
    setNewTodo(event.target.value)
  }

  const onAddTodo = async event => {
    if (event.key === "Enter") {
      event.preventDefault();

      const todo = {
        id: uuid(),
        title: event.target.value,
        completed: false
      }

      await dispatch({ type: "add", value: todo });
      setNewTodo('');
    }
  }

  const visibleTodos = todos ?? []

  const updateTodo = async event => {
    const { type, id } = event.detail;

    switch (type) {
      case 'toggleCompletion':
        await dispatch({ type: "toggleCompletion", value: id });
        break;

      case 'delete':
        await dispatch({ type: "delete", value: id });
        break;

      default:
        break;
    }
  }

  const onClearCompleted = async () => {
    await dispatch({type: "clearCompleted"})
  }

  // TODOS: code todos before app todos :)
  const allSelected = false
  const anyDone = () => false
  const onToggleAll = () => { }
  const left = []

  return (
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={onAddTodo}
          value={newTodo}
          onChange={onNewValue}
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={allSelected}
          onChange={onToggleAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{left}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <NavLink exact={true} to="/" activeClassName="selected">
              All
            </NavLink>
          </li>
          <li>
            <NavLink to="/active" activeClassName="selected">
              Active
            </NavLink>
          </li>
          <li>
            <NavLink to="/completed" activeClassName="selected">
              Completed
            </NavLink>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </React.Fragment>
  );
}
